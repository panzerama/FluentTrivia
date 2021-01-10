// public connect to database

// public get a number of questions

class QuestionsProvider {
  const connectionPassword = process.env.MONGODB_PASSWORD ?? ""
  const connectionURL = 'mongodb+srv://jonas:<password>@cluster0.49ssl.mongodb.net/fluent_trivia?retryWrites=true&w=majority'
  const database: 
}

export default QuestionsProvider