// Download all images?
var image_extensions = [];

var video_extensions = [
    "avi",
    "flv",
    "m4v",
    "mov",
    "mp4",
    "mpg",
    "wmv",
];

chrome.webRequest.onResponseStarted.addListener(function(details) {
    if (details.statusCode === 200) {
        // Request OK!
        var url = details.url;

        // Parse the crap out of the URL
        var parser = document.createElement('a');
        parser.href = url;

        // Get the file extension
        var ext = parser.pathname.match(/.([^.]+)$/i)[1];

        // Check the file type of the URL
        if (video_extensions.indexOf(ext) > -1) {
            // Video file!
            console.log(url);

            // Get the selected tab info
            chrome.tabs.getSelected(function(tab) {
                var title = tab.title;

                // Notify the user
                var notification = webkitNotifications.createNotification(
                    '', title, url);
                notification.onclick = function() {
                    chrome.tabs.create({
                        url: url,
                        active: false
                    });
                };
                notification.show();
            });
        }
    }
}, {
    urls: ["http://*/*"],
    types: [
        "object"
    ]
});
