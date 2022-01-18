$(window).click(function(){
  $(".explore").addClass("hide");
});

$(window).click(function(){
  $("select, span").addClass("show");
});

var vm = new Vue({
  el: "#weatherboxapp",
  data: {
    weathers: [],
    selected: "",
    modelShow: false
  },
  created: function(){
    this.loadweathers();
  },
  methods:
  {
  loadweathers: function()
    {
      $.ajax
      ({
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-5A2E820B-37C7-474C-A6AB-48B3CE8D0820&format=JSON&elementName=",
        success: function(res)
        {
          const weatherData = res.records.location;
          $.each(weatherData, function(index, item){           
            var dayweathers = {
              City: item.locationName,
              todayWx: item.weatherElement[0].time[0].parameter.parameterName,
              todayPOP: item.weatherElement[1].time[0].parameter.parameterName,
              todayMaxT: item.weatherElement[4].time[0].parameter.parameterName,
              todayMinT: item.weatherElement[2].time[0].parameter.parameterName,
              todayimg: "",
              
              todaynightWx: item.weatherElement[0].time[1].parameter.parameterName,
              todaynightPOP: item.weatherElement[1].time[1].parameter.parameterName,
              todaynightMaxT: item.weatherElement[4].time[1].parameter.parameterName,
              todaynightMinT: item.weatherElement[2].time[1].parameter.parameterName,
              todaynightimg: "",
              
              tomorrowWx: item.weatherElement[0].time[2].parameter.parameterName,
              tomorrowPOP: item.weatherElement[1].time[2].parameter.parameterName,
              tomorrowMaxT: item.weatherElement[4].time[2].parameter.parameterName,
              tomorrowMinT: item.weatherElement[2].time[2].parameter.parameterName,
              tomorrowimg: "",
            }
            var img_src_lists=[
              {
                name: "sun", 
                img_src: "https://i.imgur.com/34B1M45.png"
              },
              {
                name: "cloudsun",
                img_src: "https://i.imgur.com/YCfLi7W.png"
              },
              {
                name: "cloud",
                img_src: "https://i.imgur.com/wydmaqB.png"
              },
              {
                name: "rain",
                img_src: "https://i.imgur.com/TkagwOp.png"
              }
            ];
            vm.weathers.push(dayweathers);
            // console.log(dayweathers)
            if (dayweathers.todayPOP == 0){
              dayweathers.todayimg = img_src_lists[0].img_src;
            } else if (dayweathers.todayPOP >= 5 && dayweathers.todayPOP <= 45){
              dayweathers.todayimg = img_src_lists[1].img_src;
            } else if (dayweathers.todayPOP >= 50 && dayweathers.todayPOP <= 75){
              dayweathers.todayimg = img_src_lists[2].img_src;
            } else {
              dayweathers.todayimg = img_src_lists[3].img_src;
            }
            if (dayweathers.todaynightPOP == 0){
              dayweathers.todaynightimg = img_src_lists[0].img_src;
            } else if (dayweathers.todaynightPOP >= 5 && dayweathers.todaynightPOP <= 45){
              dayweathers.todaynightimg = img_src_lists[1].img_src;
            } else if (dayweathers.todaynightPOP >= 50 && dayweathers.todaynightPOP <= 75){
              dayweathers.todaynightimg = img_src_lists[2].img_src;
            } else {
              dayweathers.todaynightimg = img_src_lists[3].img_src;
            }
            if (dayweathers.tomorrowPOP == 0){
              dayweathers.tomorrowimg = img_src_lists[0].img_src;
            } else if (dayweathers.tomorrowPOP >= 5 && dayweathers.tomorrowPOP <= 45){
              dayweathers.tomorrowimg = img_src_lists[1].img_src;
            } else if (dayweathers.tomorrowPOP >= 50 && dayweathers.tomorrowPOP <= 75){
              dayweathers.tomorrowimg = img_src_lists[2].img_src;
            } else {
              dayweathers.tomorrowimg = img_src_lists[3].img_src;
            }
          })
        }
      }) 
    }
  },
})