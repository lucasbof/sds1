import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import PlatformCard from './PlatformCard';
import { GamePlatform, Game } from './types';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';

const CreateRecord = () => {
    const [platform, setPlatform] = useState<GamePlatform>();
    const [selectedGame, setSelectedGame] = useState('');
    const [allGames, setAllGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handlePlatform = (selectedPlatform: GamePlatform) => {
        setPlatform(selectedPlatform);
        const gamesByPlatform = allGames.filter(
            game => game.platform === platform
        );
        setFilteredGames(gamesByPlatform);
    };

    const handleSubmit = () => {
        const payload = {name, age, gameId: selectedGame};
        axios.post(`${BASE_URL}/records`, payload)
            .then(() => {Alert.alert('dados salvos com sucesso!')
                setName('');
                setAge('');
                setSelectedGame('');
                setPlatform(undefined);
            })
            .catch(() => Alert.alert('Erro ao salvar informações!'));

    }

    const BASE_URL = 'http://192.168.15.11:8080';

    const mapSelectValues = (games: Game[]) => {
        return games.map(game => ({
            ...game,
            label: game.title,
            value: game.id
        }))
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/games`)
            .then(response => {
                const selectValues = mapSelectValues(response.data);
                setAllGames(selectValues);
            })
            .catch(() =>  Alert.alert('Erro ao listar jogos!'));
    }, []);

    const placeholder = {
        label: 'Selecione o game',
        value: null
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <TextInput
                    onChangeText={text => setName(text)}
                    style={styles.inputText}
                    placeholder="Nome"
                    placeholderTextColor="#9E9E9E"
                    value={name}
                />
                <TextInput
                    onChangeText={text => setAge(text)}
                    keyboardType="numeric"
                    style={styles.inputText}
                    placeholder="Idade"
                    placeholderTextColor="#9E9E9E"
                    maxLength={3}
                    value={age}
                />
                <View style={styles.platformContainer}>
                    <PlatformCard
                        platform="PC"
                        icon="laptop"
                        onChange={handlePlatform}
                        activePlatform={platform}
                    />
                    <PlatformCard
                        platform="XBOX"
                        icon="xbox"
                        onChange={handlePlatform}
                        activePlatform={platform}
                    />
                    <PlatformCard
                        platform="PLAYSTATION"
                        icon="playstation"
                        onChange={handlePlatform}
                        activePlatform={platform}
                    />
                </View>
                <RNPickerSelect
                    onValueChange={value => setSelectedGame(value)}
                    placeholder={placeholder}
                    value={selectedGame}
                    items={filteredGames}
                    style={pickerSelectStyles}
                    Icon={() => {
                        return <Icon name="chevron-down" color="#9E9E9E" size={25} />
                    }}
                />
                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            SALVAR
                        </Text>
                    </RectButton>
                </View>
            </View>
        </>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        paddingRight: 30,
        fontFamily: "Play_700Bold",
        height: 50
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        paddingRight: 30,
        fontFamily: "Play_700Bold",
        height: 50
    },
    placeholder: {
        color: '#9E9E9E',
        fontSize: 16,
        fontFamily: "Play_700Bold",
    },
    iconContainer: {
        top: 10,
        right: 12,
    }
});

const styles = StyleSheet.create({
    container: {
        marginTop: '15%',
        paddingRight: '5%',
        paddingLeft: '5%',
        paddingBottom: 50
    },
    inputText: {
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        color: '#ED7947',
        fontFamily: "Play_700Bold",
        fontSize: 16,
        paddingLeft: 20,
        marginBottom: 21
    },
    platformContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        marginTop: '15%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00D4FF',
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "Play_700Bold",
        fontWeight: 'bold',
        fontSize: 18,
        color: '#0B1F34',
    }
}
);

export default CreateRecord;