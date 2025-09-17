import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '@/config';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export const useFetchValorTotal = (id_comanda: number) => {
  const [valorTotal, setValorTotal] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const fetchTotal = async () => {
    
    try {
      const response = await axios.get(`http://${config.ip}${config.port}/getValorTotal`, {
        params: {
          id_comanda: id_comanda,
        }
      });
      setValorTotal(response.data[0].total);
      //console.log('Valor total:', response.data[0].total);
    } catch (error) {
      console.error('Erro ao buscar valor total: ', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Atualiza as comandas quando a tela ganha foco
      fetchTotal();

      // Função de limpeza (opcional), se precisar fazer algo quando a tela perde foco
      return () => {
        // Função de limpeza aqui, se necessário
      };
    }, []) // O array vazio garante que o efeito só rode quando a tela ganhar foco
  );

  useEffect(() => {
    if (refresh > 0) {
      fetchTotal();
    }
  }, [refresh]); // Atualiza as comandas apenas quando "refresh" for alterado

  const triggerRefreshValorTotal = () => {
    setRefresh(prev => prev + 1);
  };

  return { valorTotal, triggerRefreshValorTotal };
};
