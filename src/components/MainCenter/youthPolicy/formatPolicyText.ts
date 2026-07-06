function normalize(value: string) {
  return value.trim().toLowerCase();
}

function stripMiddleDot(value: string) {
  return value.replace(/[·･]/g, ' ').replace(/\s+/g, ' ').trim();
}

export { normalize, stripMiddleDot };
