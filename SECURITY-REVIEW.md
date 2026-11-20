# Security review findings

Date: 2026-11-20

This review verifies the three fixes reported earlier and identifies remaining issues in the current local code.

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🟠 HIGH | src/server/routes/personalAccount/controllers/resetUserData.js | 3-4 | Cross-account data reset because userId is accepted from the request body | 9/10 |
| 2 | 🟠 HIGH | src/server/routes/personalAccount/controllers/deleteUser.js | 3-6 | Cross-account account deletion and unvalidated delete target | 9/10 |
| 3 | 🟡 MEDIUM | src/server/routes/index/controllers/logout.js | 1-3 | Refresh token is cleared only in the browser and is not revoked server-side | 9/10 |
| 4 | 🟡 MEDIUM | src/server/database/modelsUtil/users/utils/resetUserData.js | 35-58 | One reset update is outside the transaction because no session is supplied | 8/10 |

## 1. Cross-account data reset

**Status:** Partially fixed.

The original NoSQL injection in `resetUserData` is fixed: `POST /personal-account` now validates `req.body.userId` through `resetUserSchema` as a required UUID. This prevents MongoDB operator objects and other non-UUID values from reaching the database.

However, the controller still passes the requested `userId` directly to `resetUserData` instead of deriving the owner from `req.payload.userId`. Since `/personal-account` accepts both `admin` and `user`, an authenticated ordinary user who knows another user's valid UUID can reset that other user's SKU, report, tax, goods, and report-loading data.

**Fix:** For self-service operations, ignore `req.body.userId` and use `req.payload.userId`. If administrators must reset another account, use a separate administrator-only route and validate that route against administrative authorization.

## 2. Cross-account account deletion

**Status:** The original `/delete/users` mass-deletion issue is fixed.

`/delete` now requires the `admin` role, and `deleteUsersFromDb` preserves the administrator account while deleting other user data through a transaction.

The remaining `/personal-account` DELETE route is not protected against IDOR. The route accepts `admin` and `user`, and `deleteUserController` takes `req.body.userId` directly. It passes that value to `deleteUserFromDb` without comparing it to `req.payload.userId` or validating the body with a Joi schema.

An authenticated ordinary user who supplies another account's UUID can request deletion of that account and its related records. MongoDB operator values may also be attempted because the DELETE body has no validation.

**Fix:** Make ordinary `/personal-account` deletion self-service by deriving the ID from `req.payload.userId` and add a Joi UUID schema. Move deletion of another account into an administrator-only route.

## 3. Refresh token not revoked at logout

**Status:** Partially fixed.

Logout now clears both `access_token` and `refresh_token` cookies. This prevents the normal browser session from retaining those cookies.

It still does not invalidate the refresh token server-side. Refresh tokens are long-lived JWTs signed with `HS256` and remain valid for 30 days. `/auth/refresh/` verifies only the JWT signature and issues another pair of tokens; it has no revocation set, session store, or refresh-token rotation state.

If a refresh token has already been copied or stolen, logout in one browser does not prevent that token from being used to obtain new access and refresh tokens.

**Fix:** Store a server-side session identifier or hash for refresh tokens, check and revoke it during refresh/logout, and implement one-time refresh-token rotation that invalidates reused or old tokens.

## 4. Reset transaction does not cover every update

**Status:** Remaining consistency issue.

The transaction in `resetUserData` supplies `{ session }` to most delete/update operations, but `weeklyPricesAndDiscountsModel.updateOne` does not pass `{ session }`. This update can execute outside the transaction and remain changed if a later or earlier transaction operation fails.

**Fix:** Add `{ session }` to every operation in the transaction and end the session reliably even on all success and failure paths.
