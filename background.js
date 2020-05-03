browser.webRequest.onCompleted.addListener(
	function(details) {
		var filter = browser.webRequest.filterResponseData(details.requestId);

		filter.onstop = function(event) {
			var data = event.data;

			// TODO: transform `data`

			filter.write(data);
			filter.disconnect();
		};
	},
	{
		urls: ['https://www.netflix.com/watch/*'],
		types: ['main_frame']
	}
);
