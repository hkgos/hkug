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

const AppHeader = ({ navigation, drawer }) => (
  <Header style={styles.header}>
    <Left>
      <Button
        transparent
        onPress={() => {
          if (drawer) {
            navigation.openDrawer();
          } else {
            navigation.navigate(navigation.getParam('state'));
          }
        }}
      >
        <Icon style={styles.drawerIcon} name={drawer ? 'menu' : 'arrow-back'} />
      </Button>
    </Left>
    <Body style={{ flex: 8 }}>
      <Title style={styles.title}>{navigation.getParam('title', 'HKUG 香港聯登')}</Title>
    </Body>
    <Right />
  </Header>
);

export default AppHeader;
