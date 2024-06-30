// Reference: Rmit fwp COSC2938 (Semester 1, 2024) Week04.Practical.code
export function validate (values) {
  let errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}
