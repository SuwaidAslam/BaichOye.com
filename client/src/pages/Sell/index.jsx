import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import styles from "./styles.module.css"
import ContactInput from '../../components/Input'
import FileUpload from '../../components/FileUpload'
import { postAd } from '../../redux/ads/adsSlice';
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { getCategories, reset } from '../../redux/category/categorySlice'

const Sell = () => {
    const [locationValue, setLocationValue] = useState(undefined)
    const [allValues, setAllValues] = useState({
        title: '',
        description: '',
        brand: '',
        condition: undefined,
        category: '',
        price: undefined,
        images: [],
    })

    const dispatch = useDispatch()
    const { errorMessage, successMessage, isError, isSuccess, isLoading } =
        useSelector((selector) => selector.ads)

    const { categories } = useSelector(
        (selector) => selector.categories
    )

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    useEffect(() => {
        return () => dispatch(reset())
    }, [dispatch])

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
            toast.error('Location cannot be empty');
            return
        }
        console.log(allValues.category)

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
            category: undefined,
            price: undefined,
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

                                <Form.Select onChange={categoryDropdownChange}
                                    className={styles.dropdowns}
                                >
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
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
                                        placeholder: "Ad Location",
                                    }}
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