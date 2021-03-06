/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import styles from './styles';

function TeacherList(): JSX.Element {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoredTeachers = JSON.parse(response);
        const favoredTeachersIds = favoredTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoredTeachersIds);
      }
    });
  }

  function handleToggleFilterVisible(): void {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    handleToggleFilterVisible();

    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        filterButtonIcon={
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={25} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <>
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholder="Qual a matéria?"
                placeholderTextColor="#c1bccc"
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    style={styles.input}
                    value={weekDay}
                    onChangeText={text => setWeekDay(text)}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={text => setTime(text)}
                    placeholder="Qual horário?"
                    placeholderTextColor="#c1bccc"
                  />
                </View>
              </View>

              <RectButton
                onPress={handleFiltersSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          </>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favored={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
