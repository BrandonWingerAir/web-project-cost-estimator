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

  // Generate Email Message
  function setMailContent() {
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

    // Features List
    let featuresTitle = '';
    let featuresList = '';
    let recurringEstimate = '';

    var featuresCheck = document.getElementById('features-list').getElementsByTagName('input');
    var hasFeaturesTitle = false;
      
    for (var i = 0; i < featuresCheck.length; i++) {
      if (featuresCheck[i].checked) {
        if (!hasFeaturesTitle) {
          featuresTitle = '%0D%0A' + 'Additional%20Features:' + '%0D%0A';
          hasFeaturesTitle = true;
        }
        
        featuresList += featuresCheck[i].value + '%0D%0A'
      }
    }

    // Recurring Estimate
    if (recurringTotal > 0) {
      recurringEstimate = 'Estimated%20Recurring:' + '%20$' + (recurringTotal / 12) + '/m' + '%0D%0A';
    }

    
    // Total Estimate
    var totalEstimate = '%0D%0A' + 'Estimated%20Total:'+ '%20$' + totalAmount + '%0D%0A';
    
    // Footer Text
    var emailFooter = '%0D%0A' + 'Sent%20using%20the%20web%20client%20estimator | www.brandonwinger-air.com' + '%0D%0A';

    // Update Content
    var quoteLink = document.getElementById('request-quote-link');

    var mailToLink;
    
    if (featuresList !== '') {
      mailToLink = emailInfo + emailIntro + emailProject + emailPages + emailDuration + featuresTitle + featuresList + totalEstimate + recurringEstimate + emailFooter;
    } else {
      mailToLink = emailInfo + emailIntro + emailProject + emailPages + emailDuration + totalEstimate + emailFooter;
    }

    quoteLink.href = mailToLink;
  }
  
  // Handle Project Type
  $('#project-type').change(function() {
    $(this).find('option:selected').each(function() {
      switch($(this).attr("value")) {
        case 'basic-website':
          projectType = 'basic-website';
          typeDays = 5;

          $('#pages-value').val(3);
          updatePageCount();

          $('#additional-pages').html(3);
          $('#additional-page-price').html(50);

          $('#pages-form').fadeIn('slow');
          $('#included-pages').fadeIn('slow');

          break;
  
        case 'landing-page':
          projectType = 'landing-page';
          typeDays = 3;

          $('#pages-value').val(1);

          $('#pages-form').fadeOut('slow');
          $('#included-pages').fadeOut('slow');  

          break;
  
        case 'content-ecommerce':
          projectType = 'content-ecommerce';
          typeDays = 21;

          $('#pages-value').val(10);
          updatePageCount();

          $('#additional-pages').html(10);
          $('#additional-page-price').html(200);

          $('#pages-form').fadeIn('slow');
          $('#included-pages').fadeIn('slow');  

          break;
  
        case 'web-application':
          projectType = 'web-application';
          typeDays = 35;

          $('#pages-value').val(5);
          updatePageCount();

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

  // Check for click on "additional features" dropdown
  $(".dropdown-trigger").click(function() {
    $(".dropdown").toggleClass("is-active");
  });

  // Feature Amounts (In Dollars: $)
  const costGraphicDesign = 850;
  const costAdministration = 480;
  const costPrototyping = 2500;
  const costAdvancedSEO = 6000;
  const costCustomDatabase = 2000;
  const costSecurityTesting = 4500;
  const costMediaMarketing = 3000;

  // Handle Features Checklist
  $('#graphic-design').change(function() {
    if (this.checked) {
      $('#graphic-design-include').fadeIn('slow');
      featuresTotal += costGraphicDesign;
      featureDays += 5;
      computeResults();
    } else {
      $('#graphic-design-include').fadeOut('slow');
      featuresTotal -= costGraphicDesign;
      featureDays -= 5;
      computeResults();
    }
  });

  $('#administration').change(function() {
    if (this.checked) {
      $('#administration-include').fadeIn('slow');
      featuresTotal += costAdministration;
      recurringTotal += costAdministration;
      featureDays += 4;
      computeResults();
    } else {
      $('#administration-include').fadeOut('slow');
      featuresTotal -= costAdministration;
      recurringTotal -= costAdministration;
      featureDays -= 4;
      computeResults();
    }
  });
  
  $('#prototyping').change(function() {
    if (this.checked) {
      $('#prototyping-include').fadeIn('slow');
      featuresTotal += costPrototyping;
      featureDays += 7;
      computeResults();
    } else {
      $('#prototyping-include').fadeOut('slow');
      featuresTotal -= costPrototyping;
      featureDays -= 7;
      computeResults();
    }
  });

  $('#advanced-seo').change(function() {
    if (this.checked) {
      $('#advanced-seo-include').fadeIn('slow');
      featuresTotal += costAdvancedSEO;
      recurringTotal += costAdvancedSEO;
      featureDays += 21;
      computeResults();
    } else {
      $('#advanced-seo-include').fadeOut('slow');
      featuresTotal -= costAdvancedSEO;
      recurringTotal -= costAdvancedSEO;
      featureDays -= 21;
      computeResults();
    }
  });

  $('#custom-database').change(function() {
    if (this.checked) {
      $('#custom-database-include').fadeIn('slow');
      featuresTotal += costCustomDatabase;
      featureDays += 10;
      computeResults();
    } else {
      $('#custom-database-include').fadeOut('slow');
      featuresTotal -= costCustomDatabase;
      featureDays -= 10;
      computeResults();
    }
  });

  $('#security-testing').change(function() {
    if (this.checked) {
      $('#security-testing-include').fadeIn('slow');
      featuresTotal += costSecurityTesting;
      recurringTotal += costSecurityTesting;
      featureDays += 30;
      computeResults();
    } else {
      $('#security-testing-include').fadeOut('slow');
      featuresTotal -= costSecurityTesting;
      recurringTotal -= costSecurityTesting;
      featureDays -= 30;
      computeResults();
    }
  });

  $('#media-marketing').change(function() {
    if (this.checked) {
      $('#media-marketing-include').fadeIn('slow');
      featuresTotal += costMediaMarketing;
      recurringTotal += costMediaMarketing;
      featureDays += 14;
      computeResults();
    } else {
      $('#media-marketing-include').fadeOut('slow');
      featuresTotal -= costMediaMarketing;
      recurringTotal -= costMediaMarketing;
      featureDays -= 14;
      computeResults();
    }
  });

  // Handle Payment Plan
  $('#payment-plan').change(function() {
    $(this).find('option:selected').each(function() {
      switch($(this).attr("value")) {
        case 'one-payment':
          paymentType = 'one-payment';
          paymentTypeText = '.00';
          break;

        case 'monthly':
          paymentType = 'monthly';
          paymentTypeText = '/m'
          break;

        case 'weekly':
          paymentType = 'weekly';
          paymentTypeText = '/wk'
          break;

        case 'daily':
          paymentType = 'daily';
          paymentTypeText = '/day'
      }
    });

    computeResults();
  }).change();

  // Calculate Estimate
  function computeResults() {
    switch(projectType) {
      case 'basic-website':
        projectTotal = 1200;
        break;

      case 'landing-page':
        projectTotal = 750;
        break;

      case 'content-ecommerce':
        projectTotal = 3000;
        break;

      case 'web-application':
        projectTotal = 7500;
    }

    totalAmount = projectTotal + pagesTotal + featuresTotal;

    function updateTotalDays() {
      totalDays = typeDays + featureDays + pageDays;
    }

    // Payments Calculation
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

    // Update Email Message
    setMailContent();
  }
});