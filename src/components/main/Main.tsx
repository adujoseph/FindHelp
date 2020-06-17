import React, { useState, useEffect } from 'react';
import { Layout, Input, List, Rate, Card, Avatar, Typography, Spin, Select, Row, Col, } from 'antd';
import {
    getPlaces,
    getSuggestions,
    getGeoCodes,
    saveSearchHistory,
    createUser,
    createSearch,
    fetchSearch
} from '../../api/api';
import './Main.css';

// import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
//import FirebaseApp from '../../config/firebase';


interface IProps { }

type MainProps = IProps & RouteComponentProps;

interface IState { }

const { Option } = Select;
const { Content } = Layout;
const { Text } = Typography;


const Main = (props: MainProps | any) => {
    // const { user } = props;
    const [data, setData] = useState('');
    const [address, setAddress] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [radius, setRadius] = useState(10000);
    const [strings, setStrings] = useState<String>('hospitals');
    const [hist, setHist] = useState<any[]>([])
    const [showHistory, setShowHistory] = useState<boolean>(false)
    // const [userObj, setUserObj] = useState<any[]>([]);

  
    useEffect(() => {
        createUserQL();
        fetchSearchByUser();
    }, [hist]);

    //mongoDB fetch history 
    // const historyData = async () => {
    //     const { data: { data } } = await getSearchHistory()
    //     setHist(data)
    // }

    const handleAddy = async (item: string) => {
        setStrings(item)
        setShowHistory(false);
        const { results } = await getGeoCodes(item);
        results.map((result: any) => {
            let _lat = result.geometry.location.lat
            let _lng = result.geometry.location.lng
            placesApi(_lat, _lng, radius, strings);
        })
    }

    const handleChange = (e: any) => {
        setData(e.target.value)
        if (data) {
            suggestions();
        }
    }

    const handleEnterPress = () => {
        if (radius > 0) {
            getCoordinates()
            setResults([])
        }

    }

    const handleClick = (item: string) => {
        setData(item)
        setAddress(item)
        setShowHistory(false);
        createSearchQL(); 
        if (address.length > 0) {
            getCoordinates()
            setShowHistory(false);
        }
    }
    const handleSearchHistory = () => {
        setShowHistory(true);
    }
    const getCoordinates = async () => {
        console.log("address: => ",address);
        setResults([])
        if (address) {
            const { results } = await getGeoCodes(address);
            results.map((result: any) => {
                let _lat = result.geometry.location.lat
                let _lng = result.geometry.location.lng
                placesApi(_lat, _lng, radius, strings);

            })
            
        }
    }
    const getCurrentLocation = () => {
        setData('current location');
        navigator.geolocation.getCurrentPosition(function (position) {
            let _lat = position.coords.latitude
            let _lng = position.coords.longitude
            setResults([])
            placesApi(_lat, _lng, radius, strings);
        });
    }



    const placesApi = async (lati: number, longi: number, radius: number, strings: String) => {
        setLoading(true);
        const { data: { results } } = await getPlaces(lati, longi, radius, strings);
        if (results) {
            setPlaces(results)
            setLoading(false);
            await saveSearchHistory(address);
            

        }

    }

    const suggestions = async () => {
        const res = await getSuggestions(data);
        if (res.data.predictions) {
            setResults(res.data.predictions);
        }
        // console.log(results)

    }
    const createUserQL = async () => {
        if (props.user) {
          await createUser(props.user)
            // console.log('create user method:=>', resData.data.data.createUser._id)
        }
    }
    const createSearchQL = async () => {
       if (props?.user) {
            
            // console.log('create search :+> /n',address, props.user['email'])
            await createSearch(address, props.user['email'])
           // console.log('create search method:=>', resData)
        }
    }

    const fetchSearchByUser = async () => {
        const resData = await fetchSearch(props.user['email'])
        setHist(resData.data.data.fetchSearch)
        console.log("in search by user",hist)
    }
   
    return (
        <Layout>

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

                <div className="site-layout-background" style={{ padding: 24, minHeight: '80vh' }}>

                    <h2 style={{ textAlign: 'center' }} className="color"> Find the next clinic closest to your address </h2>
                    <div>
                        <div style={{ alignItems: 'center' }}>
                            <Input.Group compact >
                                <Select defaultValue="10 km Radius" onSelect={(value) => setRadius(Number(value) * 1000)}>
                                    <Option value="10">10 km Radius</Option>
                                    <Option value="20">20 km  Radius</Option>
                                    <Option value="50">50 km  Radius</Option>
                                    <Option value="100">100 km  Radius</Option>
                                    <Option value="200">200 km  Radius</Option>
                                </Select>
                                <Select defaultValue="Hospital" onSelect={(value) => setStrings(value)}>
                                    <Option value="Hospitals">Hospitals</Option>
                                    <Option value="Pharmacies">Pharmacy</Option>
                                    <Option value="Clinics">Clinics</Option>
                                    <Option value="Medical Offices"> Medical Offices</Option>
                                </Select>
                                <Input style={{ width: '70%' }} placeholder="Enter your address here..." onChange={handleChange} onPressEnter={handleEnterPress} value={data} allowClear />
                            </Input.Group>
                            {/* <span style={{ fontSize: 10 }}>Please note that the default search radius is 10 km, you can change this with the dropdown menu</span> */}
                        </div>


                        {
                            results.length > 0 ?
                                <List
                                    itemLayout="horizontal"
                                    header={<div onClick={getCurrentLocation} style={{ borderBottom: '0.5px solid lightgray', marginLeft: '5px', padding: 5, fontWeight: 700 }} > Use Current Location</div>}
                                    dataSource={results}
                                    renderItem={item => (
                                        <List.Item style={{ borderBottom: '0.5px solid lightgray' }}>
                                            <span onClick={() => handleClick(item.description)}>
                                                <List.Item.Meta
                                                    // avatar={<Avatar src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" />}
                                                    title={item.description}
                                                />
                                            </span>

                                        </List.Item>

                                    )
                                    }
                                />

                                : null
                        }

                    </div>
                    <div>





                        <span style={{ marginTop: 100 }}>
                            <Row style={{ marginTop: 100 }}>
                                <Col span={20}><h3 className='color' >{`Near by ${strings}`}</h3></Col>
                                <Col span={4}><p style={{ textAlign: 'right', cursor: 'pointer' }} onClick={handleSearchHistory}>Search History</p></Col>
                            </Row>
                            {

                                showHistory ?


                                    <div>
                                        <p>Your personalized search history</p>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={hist}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src="https://img.icons8.com/pastel-glyph/2x/worldwide-location.png" />}
                                                        title={<a onClick={() => handleAddy(item.address)}>{item.address}</a>}
                                                        description={item.createdAt}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>


                                    :
                                    !loading ?
                                        <Card title="" className='places-parent'>
                                            {
                                                places.length > 0 ?
                                                    places.map((p) => (

                                                        <Card.Grid className='exp' key={p.id}>
                                                            <h3> {p.name} </h3>
                                                            <p> {p.vicinity} </p>
                                                            <Text code>Average rating </Text><span><Rate disabled defaultValue={p.rating} /></span>
                                                            {/* <span style={{ fontSize: 10 }}>Average rating:<span style={{ color: 'red', fontWeight: 700 }}>{p.rating > 0 ? p.rating : "None"} </span> </span> */}

                                                        </Card.Grid>


                                                    ))

                                                    :
                                                    <h3>Search Results</h3>
                                            }


                                        </Card>
                                        :
                                        <Spin />

                            }
                        </span>


                    </div>
                </div>

            </Content>
        </Layout>
    );
}

export default Main;




