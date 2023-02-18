let dates = [], temps = [];
let temp_min, temp_max,country;
let chrt=null;


async function getWeather() {
    let cityname = document.getElementById('inp').value;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=a59c7629af388714789350f321c4a446&units=metric`
    let result = await fetch(url);
    var data = await result.json();
    ({city:{country}}=data)
    let { list } = data;
    dates=[],temps=[];
    ({main: { temp_min }} = list[0]);
    ({main: { temp_max }} = list[0]);
    console.log(data);
    for (let i = 0; i < list.length; i += 8) {
        let { main: { temp } } = list[i]; temps.push(temp);
        let { dt_txt } = list[i]; dates.push(dt_txt.slice(0, 10));
    }

   
    // let tinfo = document.createElement('div');
    // tinfo.innerHTML = null;
    // tinfo.innerHTML = `
    // <h4>Country Name : ${country}</h4> 
    // <h4>Max Temp is : ${temp_max}</h4>
    // <h4>Min Temp is : ${temp_min}</h4>
    // `
    // document.getElementById('mid').appendChild(tinfo);


    document.getElementById('a').innerHTML = `Country Name : ${country}`;
    document.getElementById('b').innerHTML = `Max temp is : ${temp_max}`;
    document.getElementById('c').innerHTML = `Min temp is : ${temp_min}`;
    
    
    
    const ctx = document.getElementById('myChart');
    
    if(chrt!=null) chrt.destroy();
    chrt = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature',
          data: temps,
          backgroundColor : ["#aac4ff", "#fdfdbd", "#b3ffae", "#f65a83", "#937dc2"],
          borderWidth: 2
        }],
      },
      
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    document.getElementById('d').innerHTML = `This information is according to the time : 06:00:00`;
}
