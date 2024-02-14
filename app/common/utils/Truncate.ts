export function truncate(word, maxLength) {
  if (word?.length <= maxLength) {
    return word;
  } else {
    return word?.slice(0, maxLength) + '...';
  }
}