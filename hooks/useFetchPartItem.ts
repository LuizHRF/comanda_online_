import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '@/config';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export const useFetchPartItem = (item_id: number) => {
  const [participantes, setParticipantes] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const fetchParticipantes = async () => {
    try {
      const response = await axios.get(`http://${config.ip}${config.port}/selecionarparticipantesitem`, {
        params: {
          id_item: item_id,
        }
      });
      setParticipantes(response.data);
      //console.log('Itens da comanda:', response.data);
    } catch (error) {
      console.error('Erro ao buscar as comandas: ', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Atualiza as comandas quando a tela ganha foco
      fetchParticipantes();

      // Função de limpeza (opcional), se precisar fazer algo quando a tela perde foco
      return () => {
        // Função de limpeza aqui, se necessário
      };
    }, []) // O array vazio garante que o efeito só rode quando a tela ganhar foco
  );

  useEffect(() => {
    if (refresh > 0) {
      fetchParticipantes();
    }
  }, [refresh]); // Atualiza as comandas apenas quando "refresh" for alterado

  const triggerRefreshPartItem = () => {
    setRefresh(prev => prev + 1);
  };

  return { participantes, triggerRefreshPartItem };
};
