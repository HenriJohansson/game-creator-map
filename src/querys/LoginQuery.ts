const loginQ = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    message
    token
    user {
      email
      full_name
      id
    }
  }
}
`;


const checkToken = `
query CheckToken {
    checkToken {
      message
      user {
        full_name
      }
    }
  }
`;

export {
  loginQ,
  checkToken
};