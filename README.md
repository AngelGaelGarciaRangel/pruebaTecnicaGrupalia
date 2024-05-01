# Prueba Tecnica Grupalia -  Clon CivitAI
## Hi Grupalia Team👋, here it is my code for yout technical assesment

## How to Use 💻

1. **Clone the repository**:

    ```shell
    git clone https://github.com/AngelGaelGarciaRangel/pruebaTecnicaGrupalia.git
    ```

2. **Navigate to the project directory**:

    ```shell
    cd clonCivitAI
    ```

3. **Install dependencies**:

    ```shell
    npm install
    ```

4. **Start the development server**:

    ```shell
    npm run dev
    ```
5. **Open [http://localhost:5173/](http://localhost:5173/) to view it on the browser (the port number can change)**:

## Features 🧑🏻‍💻

1. **Image Fetching**: Retrieves images from the [CivitAI API](https://github.com/civitai/civitai/wiki/REST-API-Reference), ensuring a continuous flow of new visuals.

2. **Infinite Scrolling**: Utilizes the `useInfiniteQuery` hook from [TanStack Query](https://tanstack.com/query/v4/docs/framework/react/reference/useInfiniteQuery) for seamless and infinite scrolling through images.

3. **Smooth Loading**: Implements placeholders while loading images, ensuring a smoother and more user-friendly experience.

4. **Masonry Layout**: Uses a dynamic masonry-style layout for optimal data visualization and efficient use of screen space.

5. **Interactive Dropdown Menu**: Provides the following options in the dropdown menu:
    - **Download**: Download images directly to your device.
    - **Hide Image**: Hide images for a personalized viewing experience.
    - **Copy URL**: Easily copy the URL of images to the clipboard for sharing or referencing.

## Possible improvements 💪
1. **Local/Session storage**: Save on local storage the "Hide" property to don't display images marked as "Hide" when you refresh the page.





