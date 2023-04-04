$(document).ready(function(){
  let projectType = '';
  let paymentType = '';
  let paymentTypeText = '';
  let typeDays = 0;
  let featureDays = 0;
  let projectTotal = 0;
  let featuresTotal = 0
  let paymentTotal = 0;
  let pagesTotal = 0;
  let pageDays = 0;
  let recurringTotal = 0;
  let totalDays = 0;
  let totalAmount = 0;
  
  // Handle Project Type
  $('#project-type').change(function() {
    $(this).find('option:selected').each(function() {
      if ($(this).attr("value") == 'basic-website') {
        projectType = 'basic-website';
        $('#pages-value').val(3);
        updatePageCount();
        typeDays = 5;
        $('#additional-pages').html(3);
        $('#additional-page-price').html(50);
        $('#pages-form').fadeIn('slow');
        $('#included-pages').fadeIn('slow');
      } else if ($(this).attr("value") == 'landing-page') {
        projectType = 'landing-page';
        $('#pages-value').val(1);
        $('#pages-form').fadeOut('slow');
        typeDays = 3;
        $('#included-pages').fadeOut('slow');
      } else if ($(this).attr("value") == 'content-ecommerce') {
        projectType = 'content-ecommerce';
        $('#pages-value').val(10);
        updatePageCount();
        typeDays = 21;
        $('#additional-pages').html(10);
        $('#additional-page-price').html(200);
        $('#pages-form').fadeIn('slow');
        $('#included-pages').fadeIn('slow');
      } else {
        projectType = 'web-application';
        $('#pages-value').val(5);
        updatePageCount();
        typeDays = 35;
        $('#additional-pages').html(5);
        $('#additional-page-price').html(800);
        $('#pages-form').fadeIn('slow');
        $('#included-pages').fadeIn('slow');
      }
    });

    computeResults();
  }).change();

  // Handle Page Count
  function updatePageCount() {
    let currentPages = document.getElementById('pages-value').value;
    let pricePerPage = 0;
    let includedPages = 0;
    let daysPerPage = 0;

    if (projectType == 'basic-website') {
      includedPages = 3;
      pricePerPage = 50;
      daysPerPage = 1;

      $('#additional-pages').html(includedPages);
      $('#additional-page-price').html(pricePerPage);

      if (currentPages > includedPages) {
        pagesTotal = (currentPages - includedPages) * pricePerPage;
        pageDays = (currentPages - includedPages) * daysPerPage;
      } else {
        pageDays = 0;
      }
    } else if (projectType == 'content-ecommerce') {
      includedPages = 10;
      pricePerPage = 200;
      daysPerPage = 2;

      $('#additional-pages').html(includedPages);
      $('#additional-page-price').html(pricePerPage);

      if (currentPages > includedPages) {
        pagesTotal = (currentPages - includedPages) * pricePerPage;
        pageDays = (currentPages - includedPages) * daysPerPage;
      } else {
        pageDays = 0;
      }
    } else if (projectType == 'web-application') {
      includedPages = 5;
      pricePerPage = 800;
      daysPerPage = 3;

      $('#additional-pages').html(includedPages);
      $('#additional-page-price').html(pricePerPage);

      if (currentPages > includedPages) {
        pagesTotal = (currentPages - includedPages) * pricePerPage;
        pageDays = (currentPages - includedPages) * daysPerPage;
      } else {
        pageDays = 0;
      }
    }
  }

  $('#pages-value').change(function() {
    updatePageCount();
    computeResults();
  }).change();

  // Handle Payment Plan
  $('#payment-plan').change(function() {
    $(this).find('option:selected').each(function() {
      if ($(this).attr("value") == 'one-payment') {
        paymentType = 'one-payment';
        paymentTypeText = '.00'
      } else if ($(this).attr("value") == 'monthly') {
        paymentType = 'monthly';
        paymentTypeText = '/m'
      } else if ($(this).attr("value") == 'weekly') {
        paymentType = 'weekly';
        paymentTypeText = '/wk'
      } else {
        paymentType = 'daily';
        paymentTypeText = '/day'
      }
    });

    computeResults();
  }).change();

  // Handle Features Checklist
  $('#graphic-design').change(function() {
    if (this.checked) {
      $('#graphic-design-include').fadeIn('slow');
      featuresTotal += 850;
      featureDays += 5;
      computeResults();
    } else {
      $('#graphic-design-include').fadeOut('slow');
      featuresTotal -= 850;
      featureDays -= 5;
      computeResults();
    }
  });

  $('#administration').change(function() {
    if (this.checked) {
      $('#administration-include').fadeIn('slow');
      featuresTotal += 480;
      recurringTotal += 480;
      featureDays += 4;
      computeResults();
    } else {
      $('#administration-include').fadeOut('slow');
      featuresTotal -= 480;
      recurringTotal -= 480;
      featureDays -= 4;
      computeResults();
    }
  });
  
  $('#prototyping').change(function() {
    if (this.checked) {
      $('#prototyping-include').fadeIn('slow');
      featuresTotal += 2500;
      featureDays += 7;
      computeResults();
    } else {
      $('#prototyping-include').fadeOut('slow');
      featuresTotal -= 2500;
      featureDays -= 7;
      computeResults();
    }
  });

  $('#advanced-seo').change(function() {
    if (this.checked) {
      $('#advanced-seo-include').fadeIn('slow');
      featuresTotal += 5000;
      recurringTotal += 5000;
      featureDays += 4;
      computeResults();
    } else {
      $('#advanced-seo-include').fadeOut('slow');
      featuresTotal -= 5000;
      recurringTotal -= 5000;
      featureDays -= 4;
      computeResults();
    }
  });

  $('#custom-database').change(function() {
    if (this.checked) {
      $('#custom-database-include').fadeIn('slow');
      featuresTotal += 2000;
      featureDays += 4;
      computeResults();
    } else {
      $('#custom-database-include').fadeOut('slow');
      featuresTotal -= 2000;
      featureDays -= 4;
      computeResults();
    }
  });

  $('#security-testing').change(function() {
    if (this.checked) {
      $('#security-testing-include').fadeIn('slow');
      featuresTotal += 4500;
      recurringTotal += 4500;
      featureDays += 4;
      computeResults();
    } else {
      $('#security-testing-include').fadeOut('slow');
      featuresTotal -= 4500;
      recurringTotal -= 4500;
      featureDays -= 4;
      computeResults();
    }
  });

  $('#media-marketing').change(function() {
    if (this.checked) {
      $('#media-marketing-include').fadeIn('slow');
      featuresTotal += 3000;
      recurringTotal += 3000;
      featureDays += 4;
      computeResults();
    } else {
      $('#media-marketing-include').fadeOut('slow');
      featuresTotal -= 3000;
      recurringTotal -= 3000;
      featureDays -= 4;
      computeResults();
    }
  });

  // Calculate Estimate 
  function computeResults() {
    if (projectType == 'basic-website') {
      projectTotal = 1200;
    } else if (projectType == 'landing-page') {
      projectTotal = 750;
    } else if (projectType == 'content-ecommerce') {
      projectTotal = 3000;
    } else {
      projectTotal = 10000;
    }

    totalAmount = projectTotal + pagesTotal + featuresTotal;

    function updateTotalDays() {
      totalDays = typeDays + featureDays + pageDays;
    }

    // Handle Payment Plan
    if (paymentType == 'one-payment') {
      paymentTotal = totalAmount;
      document.getElementById('payment-title').innerHTML = 'One Payment';

      if (recurringTotal > 0) {
        document.getElementById('recurring-amount').innerHTML = '$' + recurringTotal + ' / Year (Recurring)';
        document.getElementById('features-title').innerHTML = 'After the 1st year';
      } else {
        document.getElementById('recurring-amount').innerHTML = '$0 Recurring';
        document.getElementById('features-title').innerHTML = 'No Extra Features';
      }
    } else if (paymentType == 'monthly') {
      updateTotalDays();
      let totalMonths = Math.ceil(totalDays / 30);
      paymentTotal = projectTotal / totalMonths;

      if (totalMonths == 1) {
        document.getElementById('payment-title').innerHTML = 'For ' + totalMonths + ' Month';
      } else {
        document.getElementById('payment-title').innerHTML = 'For ' + totalMonths + ' Months';
      }

      if (recurringTotal > 0) {
        document.getElementById('recurring-amount').innerHTML = '$' + Math.floor(recurringTotal / 12) + ' / Month (Recurring)';
        document.getElementById('features-title').innerHTML = 'After the 1st year';
      } else {
        document.getElementById('recurring-amount').innerHTML = '$0 Recurring';
        document.getElementById('features-title').innerHTML = 'No Extra Features';
      }
    } else if (paymentType == 'weekly') {
      updateTotalDays();
      let totalWeeks = Math.ceil(totalDays / 7);
      paymentTotal = projectTotal / totalWeeks;

      if (totalWeeks == 1) {
        document.getElementById('payment-title').innerHTML = 'For ' + totalWeeks + ' Week';
      } else {
        document.getElementById('payment-title').innerHTML = 'For ' + totalWeeks + ' Weeks';
      }

      if (recurringTotal > 0) {
        document.getElementById('recurring-amount').innerHTML = '$' + Math.floor(recurringTotal / 52) + ' / Week (Recurring)';
        document.getElementById('features-title').innerHTML = 'After the 1st year';
      } else {
        document.getElementById('recurring-amount').innerHTML = '$0 Recurring';
        document.getElementById('features-title').innerHTML = 'No Extra Features';
      }
    } else {
      updateTotalDays();
      paymentTotalFloat = projectTotal / totalDays;
      paymentTotalFloat = paymentTotalFloat * 100;
      paymentTotal = Math.ceil(paymentTotalFloat);
      paymentTotal = paymentTotal / 100;
      document.getElementById('payment-title').innerHTML = 'For ' + totalDays + ' Days';

      if (recurringTotal > 0) {
        document.getElementById('recurring-amount').innerHTML = '$' + Math.floor(recurringTotal / 365) + ' / Day (Recurring)';
        document.getElementById('features-title').innerHTML = 'After the 1st year';
      } else {
        document.getElementById('recurring-amount').innerHTML = '$0 Recurring';
        document.getElementById('features-title').innerHTML = 'No Extra Features';
      }
    }

    document.getElementById('payment-amount').innerHTML = paymentTotal + paymentTypeText;

    // Handle Project Duration
    updateTotalDays();

    if (totalDays > 6) {
      document.getElementById('duration-amount').innerHTML = Math.floor(totalDays / 7) + ' Week';

      if (totalDays > 13) {
        document.getElementById('duration-amount').innerHTML = Math.floor(totalDays / 7) + ' Weeks';
      }

      daysRemaining = totalDays % 7;

      if (daysRemaining == 1) {
        document.getElementById('duration-amount').append(' ' + daysRemaining + ' Day');
      } else if (daysRemaining > 1) {
        document.getElementById('duration-amount').append(' ' + daysRemaining + ' Days');
      }
    } else {
      document.getElementById('duration-amount').innerHTML = totalDays + ' Days';
    }
  }

  var projectTypeSelect = document.getElementById('project-select');
  var projectSelected = projectTypeSelect.options[projectTypeSelect.selectedIndex].text;

  var pagesValue = document.getElementById('pages-value').value;

  var durationText = document.getElementById('duration-amount');
  var durationAmount = durationText.textContent;

  var emailInfo = 'mailto:brandon.air.web@gmail.com?subject=Project%20Estimate&body=';
  var emailIntro = 'Hi,%20the%20project%20details%20are%20below.%0D%0A';
  var emailProject = '%0D%0AProject%20Type:%20'+ projectSelected + '%0D%0A';

  if (pagesValue > 1) {
    var emailPages = 'Number%20Of%20Pages:%20'+ pagesValue + '%0D%0A';
  } else {
    var emailPages = '';
  }

  var emailDuration = 'Estimated%20Duration:%20'+ durationAmount + '%0D%0A';
  var emailFooter = '%0D%0ASent%20using%20the%20web%20client%20estimator.%0D%0A';

  var mailToLink = emailInfo + emailIntro + emailProject + emailPages + emailDuration + emailFooter;

  var quoteLink = document.getElementById('request-quote-link');
  quoteLink.href = mailToLink;
});