import {create} from 'zustand';
import { API_URL } from '../utils/constants';
import api from '../utils/api';
import axios from 'axios';


interface AuthStore {
    user: { _id: string, name:string, email:string, avatar:string, role:string } | null;
    loading: boolean;
    error: string | null;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: false,
    error: null,
    
    checkAuth: async () => {
        set({ loading: true});
        try {
            const response = await api.get(`${API_URL}/user/getUser`);
            set({ user: response.data, loading: false });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {   
                localStorage.removeItem('token');
                console.log(error);
                set({ user: null, loading: false });            
            }
    }
    }
}))

