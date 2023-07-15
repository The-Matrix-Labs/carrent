import sequelize from "../data/sequelize";

export const securityDepositSearchHelper = search => {
    let userQuery = `
                SELECT
                  id
                FROM
                  User
                WHERE email like '%${search}%'
    `;
    let profileQuery = `
                SELECT
                  userId
                FROM
                  UserProfile
                WHERE firstName like '%${search}%'
    `;

    return [
        {
            hostId: {
                $in: [
                    sequelize.literal(userQuery)
                ]
            }
        },
        {
            guestId: {
                $in: [
                    sequelize.literal(userQuery)
                ]
            }
        },
        {
            hostId: {
                $in: [
                    sequelize.literal(profileQuery)
                ]
            }
        },
        {
            guestId: {
                $in: [
                    sequelize.literal(profileQuery)
                ]
            }
        }
    ]
}