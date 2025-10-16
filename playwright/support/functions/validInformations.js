export function isValidJWT(token) {
    const jwtRegex = /^(?:[A-Za-z0-9_-]+={0,2})\.(?:[A-Za-z0-9_-]+={0,2})\.(?:[A-Za-z0-9_-]+={0,2})$/;
    return jwtRegex.test(token);
  }

export function isValidPostgresId(id) {
    const idRegex = /^[0-9A-Z]{26}$/;
    return idRegex.test(id);
  }