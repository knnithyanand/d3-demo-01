var height = 500,
width = 350;
// Dynamic Viz

var prodData = {
title: 'MA',
value: 128,
desc: 'Days without incident',
subTitle: '12/07/2017',
style: 'danger',
prev: {
  title: 'Upstream',
  value: 128,
  desc: 'Days without incident',
  subTitle: '12/07/2017',
  style: 'danger'
},
next: [
  {
    title: 'SBO',
    value: 412,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'good',
    prev: {
      title: 'MA',
      value: 128,
      desc: 'Days without incident',
      subTitle: '12/07/2017',
      style: 'danger'
    }
  }, {
    title: 'PMA',
    value: 281,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'warn',
    prev: {
      title: 'MA',
      value: 128,
      desc: 'Days without incident',
      subTitle: '12/07/2017',
      style: 'danger'
    }
  }, {
    title: 'SKO',
    value: 128,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'danger',
    prev: {
      title: 'MA',
      value: 128,
      desc: 'Days without incident',
      subTitle: '12/07/2017',
      style: 'danger'
    }
  }, {
    title: 'SKG',
    value: 1231,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'good',
    prev: {
      title: 'MA',
      value: 128,
      desc: 'Days without incident',
      subTitle: '12/07/2017',
      style: 'danger'
    }
  }
]
};

var vizData = {
primeCircle: {
  radius: 60,
  strokeWidth: 3
},
nextCircle: {
  radius: 45,
  strokeWidth: 3
},
theme: {
  good: {
    fillColor: "#00665b",
    strokeColor: "#08baac",
    textColor: "white"
  },
  warn: {
    fillColor: "#7e5a1e",
    strokeColor: "#ffb93e",
    textColor: "white"
  },
  danger: {
    fillColor: "#961a3e",
    strokeColor: "#ff306d",
    textColor: "white"
  }
}

}

var tmpData = [
{
  title: 'SBO',
  value: 412,
  desc: 'Days without incident',
  subTitle: '12/07/2017',
  style: 'good',
  prev: {
    title: 'MA',
    value: 128,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'danger'
  }
}, {
  title: 'PMA',
  value: 281,
  desc: 'Days without incident',
  subTitle: '12/07/2017',
  style: 'warn',
  prev: {
    title: 'MA',
    value: 128,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'danger'
  }
}, {
  title: 'SKO',
  value: 128,
  desc: 'Days without incident',
  subTitle: '12/07/2017',
  style: 'danger',
  prev: {
    title: 'MA',
    value: 128,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'danger'
  }
}, {
  title: 'SKG',
  value: 1231,
  desc: 'Days without incident',
  subTitle: '12/07/2017',
  style: 'good',
  prev: {
    title: 'MA',
    value: 128,
    desc: 'Days without incident',
    subTitle: '12/07/2017',
    style: 'danger'
  }
}
];

var svg;
initializeSVG();

var radiusScale = d3.scaleSqrt().domain([128, 1231]).range([vizData.nextCircle.radius - 10, vizData.nextCircle.radius + 10]);

var simulation = d3.forceSimulation()
.force('x', d3.forceX(width / 2).strength(0.055))
.force('y', d3.forceY(height / 2).strength(0.02))
.force('collide', d3.forceCollide(function (d) {
  return radiusScale(d.value) + (vizData.nextCircle.strokeWidth * 5);
}));

var circles = svg.selectAll('circle')
.data(tmpData)
.enter().append('circle')
.attr('r', function (d) {
  return radiusScale(d.value);
})
.attr('stroke-width', vizData.nextCircle.strokeWidth)
.attr('stroke', vizData.theme['good'].strokeColor)
.attr('fill', vizData.theme['good'].fillColor)
.on('click', circleClicked);

simulation.nodes(tmpData)
.on('tick', ticked);

function circleClicked(d) {
console.log(d.title);
}

function ticked() {
circles
  .attr('cx', function (d) {
    return d.x;
  })
  .attr('cy', function (d) {
    return d.y;
  });
}

function initializeSVG() {

svg = d3.select('#viz').append('svg')
  .attr('width', width)
  .attr('height', height);

svg.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('height', height)
  .attr('width', width)
  .attr('fill', 'url(#bgDark)');

var defs = svg.append('defs');

var bgDark = defs.append('linearGradient')
  .attr('id', 'bgDark')
  .attr('x1', '0%')
  .attr('y1', '0%')
  .attr('x2', '100%')
  .attr('y2', '100%')
  .attr('spreadMethod', 'pad');

bgDark.append('stop')
  .attr('offset', '0%')
  .attr('stop-opacity', 1)
  .attr('stop-color', '#716c68');

bgDark.append('stop')
  .attr('offset', '100%')
  .attr('stop-opacity', 1)
  .attr('stop-color', '#1d1d1d');

}