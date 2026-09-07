# Authentication and Authorization

The API uses JWT authentication.

## User permissions

- Users can update only their own user information.
- Users can delete only their own account.
- Users can update only cats that they own.
- Users can delete only cats that they own.

## Admin permissions

- Admin users can update any user.
- Admin users can delete any user.
- Admin users can update any cat.
- Admin users can delete any cat.

## Authentication

Protected routes require a JWT token in the Authorization header:

Authorization: Bearer <token>
