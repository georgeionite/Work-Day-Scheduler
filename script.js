$(document).ready(function () {
    // Define business hours (e.g., from 9 AM to 5 PM)
    var businessHoursStart = 9;
    var businessHoursEnd = 17;
  
    // Generate time blocks
    for (var i = businessHoursStart; i <= businessHoursEnd; i++) {
      var timeBlock = $("<div>").addClass("time-block row");
      var hour = $("<div>").addClass("hour col-2").text(i + ":00");
      var eventInput = $("<textarea>").addClass("col-8");
      var saveBtn = $("<button>").addClass("saveBtn col-2").html('<i class="fas fa-save"></i>');
  
      timeBlock.append(hour, eventInput, saveBtn);
  
      // Color-code time blocks based on current time
      var currentHour = parseInt(dayjs().format("H"));
      if (i < currentHour) {
        timeBlock.addClass("past");
      } else if (i === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
  
      $("#time-blocks").append(timeBlock);
    }
  
    // Load events from local storage
    for (var j = businessHoursStart; j <= businessHoursEnd; j++) {
      var storedEvent = localStorage.getItem("event_" + j);
      if (storedEvent) {
        $(".time-block").eq(j - businessHoursStart).find("textarea").val(storedEvent);
      }
    }
  
    // Save event to local storage
    $(".saveBtn").on("click", function () {
      var index = $(this).closest('.time-block').index();
      var event = $(this).siblings("textarea").val();
      localStorage.setItem("event_" + (businessHoursStart + index), event);
    });
  
    // Display the current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, HH:mm A"));
  });