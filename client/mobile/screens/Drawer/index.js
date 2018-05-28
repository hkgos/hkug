import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';
import { utils } from 'hkug-client-core';
import { version } from '../../package.json';

const categories = utils.categories.default;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  logoCover: {
    height: 120,
    width: '100%',
    alignSelf: 'stretch',
    position: 'absolute',
  },
  logo: {
    height: 80,
    resizeMode: Image.resizeMode.contain,
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
  },
  version: {
    padding: 8,
    alignSelf: 'flex-end',
  },
});

const Drawer = ({ navigation }) => (
  <SafeAreaView style={styles.safeAreaView}>
    <Container>
      <Content>
        <View style={styles.logoCover}>
          <Text style={styles.version}>v{version}</Text>
        </View>
        <Image
          style={styles.logo}
          source={require('../../img/logo.png')} // eslint-disable-line global-require
        />
        <List
          dataArray={categories}
          contentContainerStyle={{ marginTop: 120 }}
          renderRow={(c, _, i) => (
            <ListItem
              first={Number(i) === 0}
              last={Number(i) === categories.length - 1}
              button
              onPress={() => {
                navigation.navigate('Topics', { category: c.id, title: c.name });
                navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              <Text>{c.name}</Text>
            </ListItem>
          )}
        />
      </Content>
    </Container>
  </SafeAreaView>
);

export default Drawer;
