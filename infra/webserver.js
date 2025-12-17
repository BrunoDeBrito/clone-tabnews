function getOrigin() {
  if (["test", "development"].includes(process.env.NODE_ENV)) {
    return "http://localhost:3000";
  }

  return "https://rubiktech.com.br";
}

const webserver = {
  origin: getOrigin(),
};

export default webserver;
