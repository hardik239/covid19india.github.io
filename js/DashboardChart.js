
$(document).ready(function(){ 


        // to display  table data on dashboard

      var con = 0, act = 0, rec = 0, dea = 0, tcases = 0, acases = 0, rcases = 0, dcases = 0, st_code = []; 

      $.get('https://api.covid19india.org/state_district_wise.json',function(data){
        
        var disp_data = '';
    
        $.each(data,function(key,value){
       
          $.each(value,function(key1,value1){

          disp_data = '';

          if("statecode" !== key1){
          disp_data += '<div id='+value['statecode']+'><div class="table-split"></div>';
          disp_data += '<span>'+key+'</span><div class="table-split"></div>';
          disp_data += '<span></span><div class="table-split"></div>';
          disp_data += '<span></span><div class="table-split"></div>';
          disp_data += '<span></span><div class="table-split"></div>';
          disp_data += '<span></span><div class="table-split"></div>';

          disp_data += '<table style="display:none;"><tr>';
          disp_data += '<th>District</th>';
          disp_data += '<th style="color:red";>Confirmed</th>';
          disp_data += '<th style="color:blue">Active</th>';
          disp_data += '<th style="color:green">Recovered</th>';
          disp_data += '<th style="color:black">Deceased</th>';
          disp_data += '</tr>';

          $.each(value1,function(key2,value2){

          disp_data += '<tr>';
          disp_data += '<td>'+key2+'</td>';
          disp_data += '<td>'+value2['confirmed']+'</td>';
          disp_data += '<td>'+value2['active']+'</td>';
          disp_data += '<td>'+value2['recovered']+'</td>';
          disp_data += '<td>'+value2['deceased']+'</td>';
          disp_data += '</tr>';
          
          con += value2['confirmed'];
          act += value2['active'];
          dea += value2['deceased'];
          rec += value2['recovered'];

          });

          disp_data += '</table></div>';

          $("#main_table").append(disp_data);

          var t = Number(con)-Number(rec)-Number(dea);

          $('#'+value['statecode']).find('span')[1].append(con);
          $('#'+value['statecode']).find('span')[2].append(t);
          $('#'+value['statecode']).find('span')[3].append(rec);
          $('#'+value['statecode']).find('span')[4].append(dea);
    
          tcases += con;
          acases += t;
          rcases += rec;
          dcases += dea;
          con = act = dea = rec = 0; 
          }    
          else
            st_code[key]= value1;
        });
      });

         $('#conf').text(tcases); // total cases 
         $('#actv').text(acases); // total active
         $('#recv').text(rcases); // total recover
         $('#deac').text(dcases); // total death  
   });

     

   $(document).on('click','#main_table div',function(){  

        $(this).find('table').toggle();
        $('table').click(false);
     }); 


        $.get('https://api.covid19india.org/data.json',function(data){

          var daily_con = [], dates = [], daily_act =[], daily_rec = [], daily_dec = [];
        
          var x =data.cases_time_series.length-28;

          for(var i=x;i<data.cases_time_series.length;i++){
            dates.push((data.cases_time_series[i].date));
            daily_con.push(data.cases_time_series[i].dailyconfirmed);
            daily_rec.push(data.cases_time_series[i].dailyrecovered);
          }

          DrawChart('#AllStateConf',dates,daily_con,"Daily Confirmed",'red');

          DrawChart('#AllStateRecv',dates,daily_rec, "Daily Recovered",'green');
         
         });

        Chart.defaults.global.defaultFontFamily ='archia';
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontSize = 14;

        function DrawChart(id,labels,data,label,color){

          var ctx = $(id);
          var draw = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    label: label,
                    backgroundColor: color,
                    barThickness:10,
                    fill: true
                }
                ]
            },
            options: {
                scales:{
                  xAxes:[{
                    gridLines: {
                        drawOnChartArea: false
                      },
                    type:'time',
                    time:{
                        unit:'week',
                    displayFormats: {
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                       }  
                  }
                  }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                     }
                }]
                }
            }
        });  
      }



});
