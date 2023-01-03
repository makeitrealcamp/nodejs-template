/**
 * @openapi
 * components:
 *  schemas:
 *    ListUsersResponse:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/ListUserResponse'
 *    ListUserResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    CreateUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        name:
 *          type: string
 *    CreateUserResponse:
 *      type: object
 *      $ref: '#/components/schemas/ListUserResponse'
 *    AuthenticateUserRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    AuthenticateUserResponse:
 *      type: object
 *      properties:
 *        user:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *        validPassword:
 *          type: boolean
 */
