const env = require("../../env.js")
const mongodb = require("mongodb")
const sg = require("sendgrid")(
  "api_key"
);
module.exports = [
  {
    path: "/",
    method() {
      return new Promise((resolve, reject) => {
        let mongo = new mongodb.MongoClient(env.creds.mongo, {
          useNewUrlParser: true
        })
        mongo.connect(err => {
          if (err) reject({ err: "Could not connect to database" })
          mongo
            .db("wj")
            .collection("users")
            .find({})
            .toArray((err, docs) => {
              if (err) reject({ err: "Could not find any data" })
              resolve(docs)
            })
          mongo.close()
        })
      })
    }
  },
  {
    path: "/auth",
    method(data) {
      return new Promise((resolve, reject) => {
        data.add = "eey"
        if (1 + 1 === "3") reject({ error: "Nah" })
        resolve(data)
      })
    }
  },
  {
    path: "/register",
    method(data) {
      return new Promise((resolve, reject) => {
        let username = data
        if (!username) reject({ error: "No username" })
        sg.API(
          sg.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: {
              personalizations: [
                {
                  to: [{ email: username }],
                  subject: "New cowboy ready"
                }
              ],
              from: { email: "noreply@westernjustice.com" },
              content: [
                {
                  type: "text/plain",
                  value: "Welcome to Western Justice! Have fun :)"
                }
              ]
            }
          })
        )
          .then(() => {
            resolve({ success: "E-mail sent" })
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
]
