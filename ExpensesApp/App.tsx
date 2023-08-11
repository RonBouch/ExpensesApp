/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

// import { expensesStore } from './src/store/ExpensesStore';
// import { observer } from 'mobx-react';
import { ExpensesProvider } from './src/store/ExpensesContext';
import RootNavigator from './src/routes/RootNavigator';

function App(): JSX.Element {
  return (
    <React.Fragment>
      <SafeAreaView style={styles.safeTop} />
      <SafeAreaView style={styles.safeBottom}>
        <StatusBar barStyle={'dark-content'} />
        <ExpensesProvider>
          <RootNavigator />
        </ExpensesProvider>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  safeTop: { flex: 0, backgroundColor: 'white' },
  safeBottom: { flex: 1, backgroundColor: 'white' },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
