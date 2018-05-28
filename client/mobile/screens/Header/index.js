import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Body,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import theme from '../../theme';

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.primaryColor,
  },
  drawerIcon: {
    color: '#fff',
  },
  title: {
    color: '#fff',
  },
});

const AppHeader = ({ navigation }) => (
  <Header style={styles.header}>
    <Left>
      <Button
        transparent
        onPress={() => { navigation.openDrawer(); }}
      >
        <Icon style={styles.drawerIcon} name="menu" />
      </Button>
    </Left>
    <Body style={{ flex: 2 }}>
      <Title style={styles.title}>{navigation.getParam('title', 'HKUG 香港聯登')}</Title>
    </Body>
    <Right />
  </Header>
);

export default AppHeader;
