export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Metodo nao permitido",
    });

  }

  try {

    const { prompt } = req.body;

    const response = await fetch(

      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCOVQbTKUMZZndEfER_HKQjnz5IMS0SYZk",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          contents: [

            {

              parts: [

                {

                  text: prompt,

                },

              ],

            },

          ],

        }),

      }

    );

    const data = await response.json();

    const text =

      data.candidates?.[0]?.content?.parts?.[0]?.text ||

      "Sem resposta.";

    res.status(200).json({

      text,

    });

  } catch (error) {

    res.status(500).json({

      error: "Erro servidor",

    });

  }

}
