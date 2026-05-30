exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const webhookUrl = "https://discord.com/api/webhooks/1509301889148125456/FNjhyxsnt7aJ40Gzm3XT3ZTX4UA0JdtL5PZCNEzLwc7eRcbMkqDUTCnWOytXQanRE9Xc";

    try {
        const data = JSON.parse(event.body);

        const safeData = {
            user: data.user || "No especificado",
            discord: data.discord || "No especificado",
            coach: data.coach || "No especificado",
            package: data.package || "No especificado",
            elo: data.elo || "0",
            goal: data.goal || "No especificado"
        };

        const payload = {
            username: "The Z - Sistema de Reservas",
            avatar_url: "https://media.discordapp.net/attachments/1499887112579710976/1509381044586151936/5f9d180a-5150-48fe-a559-128e13e24952.png",

            embeds: [
                {
                    author: {
                        name: "NUEVA SOLICITUD ENTRANTE",
                        icon_url: "https://cdn.discordapp.com/icons/1407804146492510279/a_9835487f79e547197907e24b4ffeffd8.gif?size=1024"
                    },

                    title: "🎯 ¡Reserva de Coaching Registrada!",
                    description: "Se ha recibido una nueva solicitud desde la página web. Aquí están los detalles del jugador:",
                    color: 0xc5a880,

                    fields: [
                        {
                            name: "👤 CLIENTE",
                            value: `> **${safeData.user}**`,
                            inline: true
                        },
                        {
                            name: "💬 DISCORD",
                            value: `> **${safeData.discord}**`,
                            inline: true
                        },
                        {
                            name: "🏆 ELO ACTUAL",
                            value: `> **${safeData.elo}**`,
                            inline: true
                        },
                        {
                            name: "🥋 COACH SELECCIONADO",
                            value: `> **${safeData.coach}**`,
                            inline: false
                        },
                        {
                            name: "📦 PAQUETE",
                            value: `> *${safeData.package}*`,
                            inline: false
                        },
                        {
                            name: "🎯 OBJETIVO / ¿EN QUÉ QUIERE MEJORAR?",
                            value: `\`\`\`text\n${safeData.goal}\n\`\`\``,
                            inline: false
                        }
                    ],

                    thumbnail: {
                        url: "https://cdn.discordapp.com/icons/1407804146492510279/a_9835487f79e547197907e24b4ffeffd8.gif?size=1024"
                    },

                    image: {
                        url: "https://cdn.discordapp.com/icons/1407804146492510279/a_9835487f79e547197907e24b4ffeffd8.gif?size=1024"
                    },

                    footer: {
                        text: "The Z Coaching • Sistema Automático",
                        icon_url: "https://cdn.discordapp.com/icons/1407804146492510279/a_9835487f79e547197907e24b4ffeffd8.gif?size=1024"
                    },

                    timestamp: new Date().toISOString()
                }
            ]
        };

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Netlify-Function"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Discord error: ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Enviado correctamente" })
        };

    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error enviando webhook" })
        };
    }
};