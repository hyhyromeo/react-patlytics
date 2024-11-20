## To start up the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

In this project, it allow user to Run a patent infringement check against the specified company.

It will return the top two infringing products of the company along with explanations of why these
products potentially infringe the patent, specifically detailing which claims are at issue.
And also to view previous generated reports.

p.s. Explanations and potentially infringe check is run by GPT-4o-mini
p.s Please replace your own OPEN_AI_API_KEY for testing :D

or

### Build and Run the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/hyhyromeo/react-patlytics.git
   cd your-repo
   ```
2. Build the Docker image:
   docker build -t react-frontend .
3. Run the container:
   docker run -p 3000:80 react-frontend

p.s Please replace your own OPEN_AI_API_KEY for testing :D
