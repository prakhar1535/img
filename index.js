var fileInput = document.getElementById('file_input');

    // Get the image preview element
    var imagePreview = document.getElementById('image-preview');

    // Listen for file input change event
    fileInput.addEventListener('change', function () {
        // Get the selected file
        var file = fileInput.files[0];
        if (file) {
            select(file)
            // Create a FileReader instance
            var reader = new FileReader();

            // Set the image source once it's loaded
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    });

    let premium = document.getElementById('premium_holder');
    document.addEventListener("scroll", function (e) {
        let top = premium.getBoundingClientRect().top
        // console.log(top);
        if (top <= 0) {
            premium.classList.add("sticky")
        }

    });

$(document).ready(function () {
    $("#monthly").click(function () {
        $(this).addClass('active');
        $("#yearly").removeClass('active')

        $(".monthlyPriceList").removeClass('d-none');
        $(".monthlyPriceList").addClass('fadeIn');
        $(".yearlyPriceList").addClass('d-none');

        $(".indicator").css("left", "2px");
    })

    $("#yearly").click(function () {
        $(this).addClass('active');
        $("#monthly").removeClass('active');

        $(".yearlyPriceList").removeClass('d-none');
        $(".yearlyPriceList").addClass('fadeIn');
        $(".monthlyPriceList").addClass('d-none');

        $(".indicator").css("left", "163px");
    })
})
const animateInput = document.getElementById('animate_btn_file_input');
const selectFileBtn = document.getElementById('animate_btn');

// Add a click event listener to the button
selectFileBtn.addEventListener('click', function () {
    // Simulate a click event on the hidden file input element
    animateInput.click();
    animateInput.addEventListener('change', function () {
        // alert('hi')
        // Get the selected file
        var file = animateInput.files[0];

        if (file) {
            select(file)
            // Create a FileReader instance
            var reader = new FileReader();

            // Set the image source once it's loaded
            reader.onload = function (e) {
                var imagePreview = document.getElementById('image-preview');
                imagePreview.src = e.target.result;
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    });
});

async function select(file) {
    console.log('select called');
    document.querySelector("#result").textContent = '';

    let loader = document.querySelector('.loader-box')
    // loader.classList.remove('hide');s
    // loader.classList.add('loader');
    console.log('loader called');

    const url = 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/';
    const data = new FormData();
    data.append('srcImg', file, file.name);
    data.append('Session', 'string');
    console.log('data appeneed');

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '3efa16c7d2mshcd81ebb8f2e7a03p181b53jsn00f7b9d79c1b',
            'X-RapidAPI-Host': 'pen-to-print-handwriting-ocr.p.rapidapi.com'
        },
        body: data
    };

    try {

        const targetElement = document.getElementById('result_container')
        const yOffset = -200; 


const targetScrollPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;


window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
        // targetElement.scrollIntoView({ behavior: 'smooth' });
        // console.log('target element inview');


        const response = await fetch(url, options);
        console.log('response got');
        const result = await response.text();
        const resultJson = JSON.parse(result)
        //yedekh liyo
        // loader.classList.remove('loader');
        // loader.classList.add('hide')

        console.log(resultJson)
        console.log(result)


        //yedekh liyo
        // const formattedMessage = message.replace(/\n/g, "<br>");
        const formattedValue = resultJson.value.replace(/\n/g, "\n");
        // let formattedMessage = '';
        // for (let i = 0; i < resultJson.value.length; i++) {
        //   if (resultJson.value[i] === '\n') {
        //     formattedMessage += '<br>';
        //   } else {
        //     formattedMessage += resultJson.value[i];
        //   }
        // }

        // console.log(formattedMessage);

        // Update the content of the "premium" div with the API result
        // document.getElementsByClassName(".result").textContent = formattedValue;


        document.querySelector("#result").textContent = formattedValue;
        //   const resultDiv = document.querySelector(".result");
        //   resultDiv.style.visibility = "visible"

        // console.log('hi from fetch');
    } catch (error) {
        console.error(error);
    }
}
// download button
// Function to download the text as a .txt file
function downloadTextAsFile() {
    const textToDownload = document.querySelector('#result').textContent;
    const filename = 'download.txt';

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToDownload));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Add click event listener to the download button
const downloadButton = document.querySelector('#downloadBtn');
downloadButton.addEventListener('click', downloadTextAsFile);

// copy button
// Function to copy the text to the clipboard
function copyTextToClipboard() {

    const textToCopy = document.querySelector('#result').textContent;

    // Create a textarea element to hold the text temporarily
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the textarea element from the DOM
    document.body.removeChild(textarea);

    // Provide visual feedback to the user
    const copyButton = document.querySelector('#copy');
    copyButton.value = 'Copied!';
    setTimeout(() => {
        copyButton.value = 'Copy Text';
    }, 2000);
}

// Add click event listener to the copy button
const copyButton = document.querySelector('#copy');
copyButton.addEventListener('click', copyTextToClipboard);

function searchOnGoogle() {
    var resultText = document.querySelector('#result').textContent;
    if (resultText) {
        var searchQuery = resultText.replace(/\n/g, ' ').trim();
        var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(searchQuery);
        window.open(searchUrl, '_blank');
    }
}
let search = document.querySelector('#search')
search.addEventListener('click', searchOnGoogle)

const toggles = Array.from(document.querySelectorAll(".faq-toggle"));
toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
    //   alert('hi')
      toggle.parentNode.classList.toggle("active");
    });
  });