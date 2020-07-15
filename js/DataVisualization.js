 $(document).ready(function() {


    $.getJSON('https://api.covid19india.org/data.json', function (Data) {

         for(var i=0;i<Data.statewise.length;i++){
            
            if(i != 0)
            $('#state').append(new Option(Data.statewise[i].state,String(Data.statewise[i].statecode)));
         }

      });


    var ctx = $('#barChart1');
         var barChart1 = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: [],
                 datasets: [{
                     data: [],
                     label:"Confirmed",
                     borderColor: 'red',
                     backgroundColor: 'pink',
                     borderWidth:1,
                     barThickness:10,
                     fill: true
                 }
                 ]
             },
             options: {
                responsive: true,
                maintainAspectRatio: true,
                scales:{
                    xAxes:[{
                    type:'time',
                    time:{
                    unit:'month'
                   }
                   }]
                 }
             }
         });

      var ctx = $('#barChart2');
         var barChart2 = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: [],
                 datasets: [{
                     data: [],
                     label:"Active",
                     borderColor: 'blue',
                     backgroundColor: 'lightblue',
                     borderWidth:1,
                     barThickness:10,
                     fill: true
                 }
                 ]
             },
             options: {
                responsive: true,
                maintainAspectRatio: true,
                 scales:{
                   xAxes:[{
                     type:'time',
                     time:{
                     unit:'month'
                   }
                   }]
                 }
             }
         });

         var ctx = $('#barChart3');
         var barChart3 = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: [],
                 datasets: [{
                     data: [],
                     label:"Recovered",
                     borderColor: 'green',
                     backgroundColor: 'lightgreen',
                     borderWidth:1,
                     barThickness:10,
                     fill: true
                 }
                 ]
             },
             options: {
                responsive: true,
                maintainAspectRatio: true,
                 scales:{
                   xAxes:[{
                     type:'time',
                     time:{
                     unit:'month'
                   }
                   }]
                 }
             }
         });

         var ctx = $('#barChart4');
         var barChart4 = new Chart(ctx, {
             type: 'line',
             data: {
                 labels: [],
                 datasets: [{
                     data: [],
                     label:"Deaths",
                     borderColor: 'orange',
                     backgroundColor: 'yellow',
                     borderWidth:1,
                     barThickness:10,
                     fill: true
                 }
                 ]
             },
             options: {
                responsive: true,
                maintainAspectRatio: true,
                 scales:{
                   xAxes:[{
                     type:'time',
                     time:{
                     unit:'month'
                   }
                   }]
                 }
             }
         });

         var Data;

         $.get('https://api.covid19india.org/states_daily.json',function(data){
            Data = data;
            getData();

            
        });


  function getData(){

            var daily_con = [], dates = [], daily_act =[], daily_rec = [], daily_dec = [];

            var state = $('#state').val();


            var len = Data.states_daily.length;




            for (var i=57;i<len; i+=3) {

              daily_con.push(Data.states_daily[i][state.toLowerCase()]);
             
              daily_rec.push(Data.states_daily[i+1][state.toLowerCase()]);
             
              daily_dec.push(Data.states_daily[i+2][state.toLowerCase()]);
             
              dates.push(Data.states_daily[i].date);
          
              daily_act.push(Number(daily_con[daily_con.length-1])-Number(daily_rec[daily_rec.length-1])-Number(daily_dec[daily_dec.length-1]));
            
         }

             //Update Datasets... 
            
            barChart1.data.datasets[0].data = daily_con;
            barChart1.data.labels = dates;

            barChart2.data.datasets[0].data = daily_act;
            barChart2.data.labels = dates;

            barChart3.data.datasets[0].data = daily_rec;
            barChart3.data.labels = dates;

            barChart4.data.datasets[0].data = daily_dec;
            barChart4.data.labels = dates;

            barChart1.update();
            barChart2.update();
            barChart3.update();
            barChart4.update();

}

            /*Updating the bar chart with updated data in every second. */

            setInterval(function(){
                $('#state').change(getData);
            },3000);
});