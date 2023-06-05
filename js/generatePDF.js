// Generate PDF
function generatePDF() {
  var lMargin=15; //left margin in mm
  var rMargin=15; //right margin in mm
  var pdfInMM=210;  // width of A4 in mm
  var pageCenter=pdfInMM/2;

  var doc = new jsPDF("p","mm","a4");
  
  doc.setFontSize(12);
  doc.text(20, 22, 'Project Estimate');

  doc.addImage(imgData, 'PNG', doc.internal.pageSize.width - rMargin - lMargin - 20, 14, 34.395833333, 17.197916667);
  
  var centerTitle = 'Your Details';

  var lines = doc.splitTextToSize(centerTitle, (pdfInMM - lMargin - rMargin));
  var dim = doc.getTextDimensions('Text');
  var lineHeight = dim.h;

  for(var i=0;i<lines.length;i++){
    lineTop = (lineHeight/2) * i;

    doc.setFontSize(15);
    doc.setFontType('bold');
    doc.text(lines[i], pageCenter, 50 + lineTop, 'center');

    let textWidth = doc.getTextWidth(centerTitle);

    doc.line(pageCenter - textWidth / 2, 52 + lineTop, pageCenter + textWidth / 2 + 2, 52 + lineTop, 'center')
  }

  doc.setFontSize(12);

  var lineMargin = 0;
  var featuresMargin = 1;
  var hasFeatureMargin = 0;
  var paymentLineMargin = 0;
  var recurringLineMargin = 0;

  // Project Type
  doc.setFontType('bold');
  doc.text(20, 70, 'Project Type:');

  var projectType = document.getElementById('project-select');
  var projectSelected = projectType.options[projectType.selectedIndex].text;

  doc.setFontType('normal');
  doc.text(49, 70, projectSelected);

  // Project Pages
  var pagesAmount = document.getElementById('pages-value').value;

  if (pagesAmount > 1) {
    lineMargin = 10;

    doc.setFontType('bold');
    doc.text(20, 80, 'Number of Pages:');

    doc.setFontType('normal');
    doc.text(58, 80, pagesAmount);
  }

  // Project Duration
  doc.setFontType('bold');
  doc.text(20, 90, 'Estimated Duration:');

  var projectDuration = document.getElementById('duration-amount');
  var durationAmount = projectDuration.textContent;

  doc.setFontType('normal');
  doc.text(62, 90, durationAmount);

  // Project Features  
  var featuresList = document.getElementById('features-list');
  var featuresCheck = featuresList.getElementsByTagName('input');

  if (featuresCheck.length > 0) {
    doc.setFontType('bold');
    doc.text(20, 90 + lineMargin, 'Features:');
  }

  for (var i = 0; i < featuresCheck.length; i++) {
    if (featuresCheck[i].checked) {
      hasFeatureMargin = 10;
      featuresMargin += 1;

      doc.setFontType('normal');
      doc.setFontSize(10);
      doc.text(20, 80 + featuresMargin * 10 + lineMargin, featuresCheck[i].value);
    }
  }

  // Payment Type
  doc.setFontType('bold');
  doc.setFontSize(12);
  doc.text(20, 80 + featuresMargin * 10 + hasFeatureMargin + lineMargin, 'Payment Plan:');
  
  var paymentType = document.getElementById('payment-select');
  var paymentSelected = paymentType.options[paymentType.selectedIndex].text;
  
  doc.setFontType('normal');
  doc.text(51, 80 + featuresMargin * 10 + hasFeatureMargin + lineMargin, paymentSelected);
  
  // Total Estimate
  doc.setFontType('bold');
  doc.text(20, 90 + featuresMargin * 10 + hasFeatureMargin + lineMargin, 'Total Estimate');
  
  let textWidth = doc.getTextWidth('Total Estimate');
    doc.line(20, 92 + lineTop + featuresMargin * 10 + hasFeatureMargin + lineMargin, 20 + textWidth, 92 + lineTop + featuresMargin * 10 + hasFeatureMargin + lineMargin);
  
  var paymentAmount = document.getElementById('payment-amount');
  var totalPayment = '$' + paymentAmount.textContent;
  
  doc.setFontType('normal');
  doc.text(20, 100 + featuresMargin * 10 + hasFeatureMargin + lineMargin, totalPayment);

  if (paymentSelected !== 'One Payment') {
    var paymentCount = document.getElementById('payment-title');
    var totalPayments = paymentCount.textContent;

    paymentLineMargin = 10;

    doc.text(20, 110 + featuresMargin * 10 + hasFeatureMargin + lineMargin, totalPayments);
  }

  // Recurring
  var paymentAmount = document.getElementById('recurring-amount');
  var totalPayment = paymentAmount.textContent;

  if (totalPayment !== '$0 Recurring') {
    doc.setFontType('bold');
    doc.text(20, 110 + featuresMargin * 10 + hasFeatureMargin + lineMargin + paymentLineMargin, 'After first year');
    
    doc.setFontType('normal');
    doc.text(20, 120 + featuresMargin * 10 + hasFeatureMargin + lineMargin + paymentLineMargin, totalPayment);

    recurringLineMargin = 10;
  }

  // More Information
  var totalTitle = 'brandon.air.web@gmail.com';

  var lines = doc.splitTextToSize(totalTitle, (pdfInMM - lMargin - rMargin));
  var dim = doc.getTextDimensions('Text');
  var lineHeight = dim.h;

  for (var i=0;i<lines.length;i++){
    lineTop = (lineHeight/2) * i;

    doc.setFontSize(15);
    doc.text(lines[i], pageCenter, 262 + lineTop + featuresMargin * 10 + hasFeatureMargin + lineMargin + paymentLineMargin + recurringLineMargin, 'center');

    let textWidth = doc.getTextWidth(totalTitle);

    doc.line(pageCenter - textWidth / 2, 266 + lineTop + featuresMargin * 10 + hasFeatureMargin + lineMargin + paymentLineMargin + recurringLineMargin, pageCenter + textWidth / 2 + 2, 266 + lineTop + featuresMargin * 10 + hasFeatureMargin + lineMargin + paymentLineMargin + recurringLineMargin, 'center');
  }

  doc.text('www.brandonwinger-air.com', pageCenter, 273 + lineTop + featuresMargin * 10 + hasFeatureMargin + lineMargin + paymentLineMargin + recurringLineMargin, 'center');

  // Save the file
  doc.save('project-estimate-by-brandon-winger-air.pdf');
}