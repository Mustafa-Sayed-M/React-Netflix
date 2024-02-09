// # Synchronous Functions:
export const formatRating = (rate) => {
    return rate && rate !== Math.ceil(rate) ? rate.toFixed(1) : rate;
};

export const formatTitle = (title) => {
    return title.length > 18 ? title.slice(0, 18) + '...' : title;
};

export const formatOverview = (overview) => {
    return overview.length > 230 ? overview.slice(0, 230) + '...' : overview;
};

export const formatDate = (release_date) => {
    return release_date.slice(0, 4);
};

export const formatRunTime = (time) => {
    if (time) {
        if (time > 240) return '4h ' + (time - 240) + 'm';
        if (time > 180) return '3h ' + (time - 180) + 'm';
        if (time > 120) return '2h ' + (time - 120) + 'm';
        if (time > 60) return '1h ' + (time - 60) + 'm';
        if (time === 60) return '1h';
        return time + 'm';
    }
    return '';
};

// # Asynchronous Functions:
export const fetchData = async (api_link, options) => {
    try {
        const res = await fetch(api_link, options);
        const data = await res.json();;
        return data;
    } catch (error) {
        return `Error fetching data from ${api_link}`;
    }
};