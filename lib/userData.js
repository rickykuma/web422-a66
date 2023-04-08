import { getToken } from "./authenticate";

export async function addToFavourites(id) {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  }

  export async function removeFromFavourites(id) {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  }

  export async function getFavourites() {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      headers: {
        'Authorization': `JWT ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  }
  
  export async function addToHistory(id) {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  }
  
  export async function removeFromHistory(id) {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  }
  
  export async function getHistory() {
    const token = getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      headers: {
        'Authorization': `JWT ${token}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  }