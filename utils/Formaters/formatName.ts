const _ = require("lodash");

export default function truncateNames(name: string) {
  const text = _.startCase(_.toLower(name));
  if (text.length < 30) {
    return text;
  } else {
    return text.substring(0, 30) + "...";
  }
}

export function PascalName(name: string | null) {
  if (name) {
    const text = _.startCase(_.toLower(name));
    return text;
  } else {
    return;
  }
}
