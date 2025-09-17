import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '@/config';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export const useFetchItens = (_comanda_id: number) => {
  const [itens, setItens] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const fetchItens = async () => {
    try {
      const response = await axios.get(`http://${config.ip}${config.port}/selecionaritenscomanda`, {
        params: {
          id_comanda: _comanda_id,
        }
      });
      setItens(response.data);
      //console.log('Itens da comanda:', response.data);
    } catch (error) {
      console.error('Erro ao buscar as comandas: ', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Atualiza as comandas quando a tela ganha foco
      fetchItens();

      // Função de limpeza (opcional), se precisar fazer algo quando a tela perde foco
      return () => {
        // Função de limpeza aqui, se necessário
      };
    }, []) // O array vazio garante que o efeito só rode quando a tela ganhar foco
  );

  useEffect(() => {
    if (refresh > 0) {
      fetchItens();
    }
  }, [refresh]); // Atualiza as comandas apenas quando "refresh" for alterado

  const triggerRefreshItens = () => {
    setRefresh(prev => prev + 1);
  };

  return { itens, triggerRefreshItens };
};
