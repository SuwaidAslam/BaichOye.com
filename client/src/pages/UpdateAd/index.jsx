import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import styles from "./styles.module.css"
import ContactInput from '../../components/Input'
import FileUpload from '../../components/FileUpload'
import { reset, updateAd } from '../../redux/ads/adsSlice'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useLocation } from 'react-router-dom'


const UpdateAd = () => {
    const [locationValue, setLocationValue] = useState(null)
    // const { state: ad } = useLocation()
    const location = useLocation()
    const id = location.state
    const [allValues, setAllValues] = useState({
        title: '',
        description: '',
        brand: '',
        condition: '',
        category: '',
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

    useEffect(() => {
        return () => dispatch(reset())
    }, [dispatch])

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

        if (allValues.images) {
            for (let i = 0; i < allValues.images.length; i++) {
                formData.append('images', allValues.images[i].file)
            }
        }

        allValues.title && formData.append('title', allValues.title)
        allValues.brand && formData.append('brand', allValues.brand)
        allValues.category && formData.append('category', allValues.category)
        allValues.condition && formData.append('condition', allValues.condition)
        allValues.description && formData.append('description', allValues.description)

        if (locationValue !== null) {
            formData.append('location', locationValue && locationValue.label)
        }

        allValues.price && formData.append('price', allValues.price)

        dispatch(updateAd({ id, ad: formData }))

        setAllValues({
            title: '',
            description: '',
            brand: '',
            condition: '',
            category: '',
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
                        Update YOUR AD
                    </h3>
                    <p className={styles.description} style={{ color: '#fff' }}>
                        Update Some Details
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
                                // value={allValues.title}
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

                            <FileUpload allValues={allValues} setAllValues={setAllValues} />

                            <div className="input-control">
                                <label className="mb-2 text-uppercase">
                                    Enter your location
                                </label>
                                <GooglePlacesAutocomplete
                                    selectProps={{
                                        locationValue,
                                        onChange: setLocationValue,
                                    }}
                                    autocompletionRequest={{
                                        componentRestrictions: { country: ['pk'] },
                                    }}
                                />
                            </div>
                        </Row>

                        <div>
                            <Button className={styles.postButton} type="submit">
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default UpdateAd