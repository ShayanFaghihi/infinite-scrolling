const container = document.querySelector('.container');


async function getImage() {
    const api_url = 'https://api.unsplash.com/photos/?client_id=1vf08jjj7w0wse_Mz5JZXCk9E4YjtcHsWQdk91rKGkw';
    const config = {
        headers: {
            'Accept-Version': 'v1'
        }
    };
    const request = await fetch(api_url, config);
    const data = await request.json();

    data.forEach(api => {
        const imageUrl = api.urls.regular;

        // Create Image element 
        const ele = document.createElement('img');
        ele.setAttribute('src', imageUrl);
        container.append(ele);
    });
    
    // console.log(data);
}


getImage();