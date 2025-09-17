import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '@/config';

export const useFtechValorIndividual = (id_comanda: number, id_usuario: number) => {
  const [valorTotal, setValorTotal] = useState([]);

  const fetchTotal = async () => {
    
    try {
      const response = await axios.get(`http://${config.ip}${config.port}/getValorIndividual`, {
        params: {
          id_comanda: id_comanda,
          id_usuario: id_usuario,
        }
      });
      setValorTotal(response.data);
      //console.log('Valor total:', response.data[0].total);
    } catch (error) {
      console.error('Erro ao buscar valor individual: ', error);
    }
  };


  return { valorTotal};
};
