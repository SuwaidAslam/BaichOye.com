import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import styles from "./styles.module.css"
import ContactInput from '../../components/Input'
import FileUpload from '../../components/FileUpload'
import { postAd } from '../../redux/ads/adsSlice';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const Sell = () => {
    const [locationValue, setLocationValue] = useState('')
    const [allValues, setAllValues] = useState({
        title: '',
        description: '',
        brand: '',
        condition: 'New',
        category: 'Mobile Phones',
        price: null,
        images: [],
    })

    const dispatch = useDispatch()
    const { errorMessage, successMessage, isError, isSuccess, isLoading } =
        useSelector((selector) => selector.ads)

    useEffect(() => {
        if (isError && errorMessage) {
            toast.error(errorMessage)
        }

        if (isSuccess && successMessage) {
            toast.success(successMessage)
        }
    }, [isError, isSuccess, errorMessage, successMessage, dispatch])

    const handleChange = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }
    const dropDownChange = (e) => {
        setAllValues({ ...allValues, condition: e.target.value })
    }
    const categoryDropdownChange = (e) => {
        setAllValues({ ...allValues, category: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        for (let i = 0; i < allValues.images.length; i++) {
            formData.append('images', allValues.images[i].file)
        }
        if (!locationValue) {
            // toast.error('Location cannot be empty');
            alert('Location cannot be empty');
            return
        }

        formData.append('title', allValues.title)
        formData.append('brand', allValues.brand)
        formData.append('category', allValues.category)
        formData.append('condition', allValues.condition)
        formData.append('description', allValues.description)
        formData.append('location', locationValue.label)
        formData.append('price', allValues.price)

        dispatch(postAd(formData))

        setAllValues({
            title: '',
            description: '',
            brand: '',
            condition: '',
            category: 'Mobile Phones',
            price: null,
            images: [],
        })
    }

    if (isLoading) {
        return (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ThreeDots color="#3a77ff" height={100} width={100} />
            </div>
        )
    }

    return (
        <div className={styles.contact_page}>
            <div className={styles.cliped_bg}></div>
            <Container>
                <div className={styles.contact_us_container}>
                    <h3 className={styles.heading} style={{ color: '#fff' }}>
                        POST YOUR AD
                    </h3>
                    <p className={styles.description} style={{ color: '#fff' }}>
                        Include Some Details
                    </p>
                    <form
                        className={styles.contactform}
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                    >
                        <Row className="g-2 gy-4">
                            <ContactInput
                                label="Ad Title"
                                placeholder="title..."
                                name="title"
                                handleChange={handleChange}
                            />
                            <ContactInput
                                label="Description"
                                placeholder="Add your ad description..."
                                name="description"
                                handleChange={handleChange}
                            />
                            <ContactInput
                                label="Brand"
                                placeholder="e.g Apple, Samsung..."
                                name="brand"
                                handleChange={handleChange}
                            />

                            <div>
                                <p className={styles.input_label}>Condition</p>
                                <Form.Select onChange={dropDownChange} className={styles.dropdowns}>
                                    <option value="New">New</option>
                                    <option value="Open">Open</option>
                                    <option value="Used">Used</option>
                                    <option value="Refurbished">Refurbished</option>
                                </Form.Select>
                            </div>

                            <div>
                                <p className={styles.input_label}>Categories</p>

                                <Form.Select onChange={categoryDropdownChange} className={styles.dropdowns}>
                                    <option value="Mobile Phones">Mobile Phones</option>
                                    <option value="Cars">Cars</option>
                                    <option value="Motorcycles">Motorcycles</option>
                                    <option value="Houses">Houses</option>
                                    <option value="TV">TV</option>
                                    <option value="Video - Audio">Video - Audio</option>
                                    <option value="Tablets">Tablets</option>
                                    <option value="Laptops">Laptops</option>
                                    <option value="Land & Plots">Land & Plots</option>
                                    <option value="Others">Others</option>
                                </Form.Select>
                            </div>

                            <ContactInput
                                label="SET A PRICE"
                                placeholder="price..."
                                type="number"
                                name="price"
                                handleChange={handleChange}
                            />

                            <FileUpload allValues={allValues} setAllValues={setAllValues}/>

                            <div className="input-control">
                                <label className="mb-2 text-uppercase">
                                    Enter your location
                                </label>
                                <GooglePlacesAutocomplete
                                    selectProps={{
                                        locationValue,
                                        onChange: setLocationValue,
                                    }}
                                    apiKey="AIzaSyDuUtfXuyRXaGlbzRGVYRYMx41T02DkLzw"
                                    autocompletionRequest={{
                                        componentRestrictions: { country: ['pk'] },
                                    }}
                                />
                            </div>
                        </Row>

                        <div>
                            <Button className={styles.postButton} type="submit">
                                Post Now
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Sell