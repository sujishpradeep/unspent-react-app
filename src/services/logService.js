import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://e1825cdb523f43ffb8017e12139c72cb@sentry.io/1515342"
  });
}

export default {
  init
};
