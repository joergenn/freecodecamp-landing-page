let ctx = document.getElementById('myChart1').getContext('2d');
let ctx2 = document.getElementById('myChart2').getContext('2d');
let ctx3 = document.getElementById('myChart3').getContext('2d');

let names,
    price,
    myChart,
    pieChart,
    lineChart,
    ddata = [
        {
            "name": "John Packer JP132R Bb Tenor Trombone",
            "description": "The JP132R features a rose brass bell as standard ensuring the player stands out from the crowd as well as providing a rich and warm tone.",
            "price": 400,
            "discount": 0,
            "image": "src/4.jpg",
            "benefits": ["12.30mm bore", "Lightweight instrument", "8” bell", "Nickel silver valves"]
        },
        {
            "name": "John Packer JP134 C Valve Trombone",
            "description": "This instrument is Ideal for valve players who want to dabble with a trombone without learning slide positions.",
            "price": 520,
            "discount": 50,
            "image": "src/5.jpg",
            "benefits": ["Yellow brass slide and tuning slide", "Lightweight instrument", "Perfect for younger players", "Medium Bore"]
        },
        {
            "name": "John Packer JP134 Valve (EX DEMO A)",
            "description": "So you are a valve player who wants to give the trombone a go, but don’t want to have to learn the slide positions, the JP134 is your answer.",
            "price": 700,
            "discount": 0,
            "image": "src/6.jpg",
            "benefits": ["12.30mm bore", "8” bell", "Key: C"]
        },
        {
            "name": "JP133LR Bb/F Large Bore Lacquer",
            "description": "The JP133LR Bb/F Is John Packer's large bore tenor trombone perfect for school ensembles, training bands and for those players who require a reliable Bb/F trombone but can't justify the cost of a more expensive instrument.",
            "price": 750,
            "discount": 0,
            "image": "src/7.jpg",
            "benefits": ["Short slide design enabling younger players to achieve the whole range of notes", "Ergonomic thumb rest/trigger"]
        },
        {
            "name": "Yamaha YSL-354E Bb Tenor Trombone",
            "description": "Yamaha standard trombones were designed to make it easier for beginning students to sound good…and as soon as possible.",
            "price": 880,
            "discount": 20,
            "image": "src/8.jpg",
            "benefits": ["Small shank bore measuring .525", "Large bore tenor trombone boasts an 8 bell", "Bell ring providing a robust structure", "Rose brass bell ensuring a full, dark sound"]
        },
        {
            "name": "John Packer JP332 Rath Bb/F Trombone",
            "description": "The JP332 Rath represents John Packer's flagship Bb/F large bore tenor trombone designed and manufactured in collaboration with Michael Rath, one of the UK's leading trombone specialists.",
            "price": 950,
            "image": "src/9.jpg",
            "discount": 15,
            "benefits": ["A bell ring provides a robust structure and a rose brass bell ensures a full, dark sound", "Large bore 13.8mm (.547\")"]
        },
        {
            "name": "John Packer JP232 Bass Trombone",
            "description": "This instrument has been very successful as a step up model in the semi professional market and has been praised for its well balanced and free blowing nature.",
            "price": 1040,
            "discount": 0,
            "image": "src/10.jpg",
            "benefits": ["Key Of: Bb", "Finish: Lacquered Brass", "Outer Slide Material: Nickel Silver", "Bore Size: .500\""]
        },
        {
            "name": "Yamaha YSL-445GE Bb Tenor Trombone",
            "description": "Yamaha is a leading player in the musical instrument industry. Yamaha instruments are renowned for their exceptional build quality, reliability and manufacturing precision and consistency.",
            "price": 1185,
            "discount": 0,
            "image": "src/11.jpg",
            "benefits": ["Many players choose Yamaha as they are a widely respected and trusted brand", "Warranty: 2 Years", "Bore: Medium 12.70mm (0.500\")"]
        },
        {
            "name": "Yamaha YSL-356GE Bb/F Tenor Trombone",
            "description": "Yamaha's Standard model tenor/bass trombone features many of the qualities of our top pro models, yet is available at a surprisingly affordable price.",
            "price": 1300,
            "discount": 0,
            "image": "src/12.jpg",
            "benefits": ["Key Of: Bb", "Bell Diameter: 20.3cm (8\")", "Bell Material: Yellow Brass", "2 Piece Yellow Brass Bell", "Bore Size: 1.31cm (0.51\")"]
        },
        {
            "name": "Jupiter JSL-135 Bb",
            "description": "The Rath R00 series of trombones bridges the gap between student level instruments and our custom, modular, hand crafted instruments.",
            "price": 1550,
            "image": "src/13.jpg",
            "discount": 25,
            "benefits": ["12.30mm bore", "8” bell", "Bell Size: Yellow Brass 203mm (8\")"]
        }
    ];

names = ddata.map(e => e.name);
price = ddata.map(e => e.price);


function graph(){
    ctx = document.getElementById('myChart1').getContext('2d');
    ctx2 = document.getElementById('myChart2').getContext('2d');
    ctx3 = document.getElementById('myChart3').getContext('2d');

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['December', 'January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Sales by last 6 months',
                data: [125, 111, 99, 113, 146, 127],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
    
    pieChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: names,
            datasets: [{
                data: price,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    lineChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ['2017', '2018', '2019', '2020', '2021'],
            datasets: [{
                label: 'Sales by last 5 years',
                data: Array(5).fill().map(() => Math.round(Math.random() * 1500) + 500),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
    // lineChart = new Chart(ctx3, {
    //     animationEnabled: true,
    //     theme: "light2",
    //     title:{
    //         text: "Simple Line Chart"
    //     },
    //     data: [{        
    //         type: "line",
    //           indexLabelFontSize: 16,
    //         dataPoints: [
    //             { y: 450 },
    //             { y: 414},
    //             { y: 520, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
    //             { y: 460 },
    //             { y: 450 },
    //             { y: 500 },
    //             { y: 480 },
    //             { y: 480 },
    //             { y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
    //             { y: 500 },
    //             { y: 480 },
    //             { y: 510 }
    //         ]
    //     }]
    // });  
}

function destroy(){
    myChart.destroy();
    pieChart.destroy()
    lineChart.destroy();
}

graph();