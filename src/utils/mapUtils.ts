
export const getBuckets = (features: GeoJSON.Feature[]) => {
  // This is some javascript voodoo to get maxSeroprevalence
  const maxSeroprevalence = Math.max.apply(Math, features.filter(o => o.properties?.seroprevalence).map((o) => o?.properties?.seroprevalence));
  const roundedMax = Math.ceil(maxSeroprevalence);
  const maxLogit = getLogit(roundedMax);

  // This is an arbitrary value that I chose because on the logit scale
  // as you decrease in size you approach infinity, not 0
  const lowerEnd = -7;
  const differenceScale = maxLogit - lowerEnd
  const bucketSegments = 6
  const step = differenceScale / bucketSegments;
  const buckets = [0];
  for (let x = 1; x <= 6; x++) {
    const logitStep = parseFloat(getDecimalFromLogit(-7 + step * x).toFixed(1));
    buckets.push(logitStep);
  }
  return buckets;
}

const getLogit = (percentage: number) => {
  const decimal = percentage / 100;
  return Math.log(decimal) - Math.log(1 - decimal);
}

// Abstract to utils
const getDecimalFromLogit = (logit: number) => {
  return Math.exp(logit) / (Math.exp(logit) + 1) * 100
}

export const colors = ['#76E57F', '#62CA7C', '#4FB079', '#3B9577', '#277A74', '#146071', '#00456E', "#EEEEEE"]

// TODO: abstract this to utils function
export const getColor = (d: number | null, buckets: number[]) => {
  if (d === null) return colors[7];
  // for (let i = 0, last = colors[6]; i < buckets.length; last = colors[i++]) {
  //   if (d < buckets[i]) return last;
  // }
  let i = buckets.findIndex(max => d <= max);
  return colors[i !== null ? i - 1 : 6 ];
}
