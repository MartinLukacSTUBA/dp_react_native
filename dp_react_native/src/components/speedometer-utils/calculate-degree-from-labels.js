function calculateDegreeFromLabels(degree, labels) {
  console.log('label length:' + labels.length);
  const perLevelDegree = degree / labels.length;
  return perLevelDegree;
}

export default calculateDegreeFromLabels;
