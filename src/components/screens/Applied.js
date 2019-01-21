import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import { database } from '../../config/firebase_config';
import { deleteJob, fetchUsersJobs } from '../../store';

class Applied extends React.Component {
  removeJob(jobId) {
    const userId = this.props.currentUser.uid;
    this.props.deleteJob(jobId);
    database
      .ref('jobs')
      .child(userId)
      .child(jobId)
      .remove();
  }

  render() {
    const usersAppliedJobs = Object.keys(this.props.selectedJobs)
      .map(key => this.props.selectedJobs[key])
      .filter(job => job.applied);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ justifyContent: 'center', paddingHorizontal: 150 }}>
            <Text style={styles.text}>Applied Jobs</Text>
          </View>
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={usersAppliedJobs}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.jobContainer}>
              <View style={styles.jobDetails}>
                <View style={styles.jobLogo}>
                  {!item.company_logo ? (
                    <Image
                      source={require('../../../assets/job_icon.png')}
                      style={{
                        marginLeft: 5,
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: item.company_logo }}
                      style={{
                        marginLeft: 5,
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                    />
                  )}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Detail', {
                      params: {
                        title: item.title,
                        company: item.company,
                        description: item.description,
                        location: item.location,
                        url: item.url,
                        howToapply: item.how_to_apply,
                        posted: item.created_at,
                        companyUrl: item.company_url,
                        type: item.type,
                        logo: item.company_logo,
                      },
                    })
                  }
                >
                  <Text>{item.position}</Text>
                  <Text>{item.company}</Text>
                  <Text>{item.location}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.removeJob(item.id)}
                >
                  <Text style={styles.textBtn}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2c3e50',
    height: 70,
    paddingTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 17,
    textAlign: 'center',
  },
  jobContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    backgroundColor: '#eeeeee',
  },
  jobDetails: {
    flexDirection: 'row',
    width: 250,
  },
  jobLogo: {
    justifyContent: 'flex-start',
    width: 80,
  },
  buttonsContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#fc5c65',
    backgroundColor: '#fc5c65',
    borderRadius: 25,
    paddingVertical: 10,
    width: 100,
  },
  textBtn: {
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  selectedJobs: state.usersSelectedJobs,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  deleteJob: jobId => dispatch(deleteJob(jobId)),
  getMyJobs: userId => dispatch(fetchUsersJobs(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Applied);
