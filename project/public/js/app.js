import Scholarship from "./scholarship.js";
export default class App {
  /*
   Changes to make when mergining
   1. Make homebutton go to Fabio's home page
      - currently goes to my own homepage for my implementation

  */
  constructor() {
    //functionality for likeButton
    this._likeButton = document.querySelector("#heart");
    this._onLikeButton = this._onLikeButton.bind(this);
    this._likeButton.addEventListener("click", this._onLikeButton);

    //functionality for homeButton
    this._homeButton = document.querySelector("#home");
    this._onHomeButton = this._onHomeButton.bind(this);
    this._homeButton.addEventListener("click", this._onHomeButton);

    //functionality for nextButton
    this._nextButton = document.querySelector("#next");
    this._onNextButton = this._onNextButton.bind(this);
    this._nextButton.addEventListener("click", this._onNextButton);

    //functionality for addScholarship
    this._addScholarshipButton = document.querySelector("#addScholarship");
    this._onaddScholarshipButton = this._onaddScholarshipButton.bind(this);
    this._addScholarshipButton.addEventListener("click", this._onaddScholarshipButton);


    /* FUNCTIONALITY FOR ADD SCHOLARSHIP*/
    this._addForm = document.querySelector("#addForm");
    this._onClear = this._onClear.bind(this);
    this._addForm.clear.addEventListener("click", this._onClear);

    this._onSubmit = this._onSubmit.bind(this);
    this._addForm.addEventListener("submit", this._onSubmit);

    //begin with scholarship one
    this._scholarship = null;
    this._loadNextScholarship(0); //starts at 0 b/c gets the next scholarship which is one
  }

  _onLikeButton(event) {
    event.preventDefault();
    if (this._likeButton.textContent === "💜") {
      //remove scholarship from liked array
      this._likeButton.textContent = "🖤";
    } else {
      //include scholarship in like array
      this._likeButton.textContent = "💜";
    }
  }

  //CHANGE TO FABIO'S PAGE WHEN MERGINING
  _onHomeButton(event) {
    event.preventDefault();
    document.querySelector(".scholarshipInfo").classList.remove("hidden");
    document.querySelector(".scholarshipInfoForm").classList.add("hidden");
  }

  async _onNextButton(event) {
    event.preventDefault();
    await this._loadNextScholarship(this._scholarship.id);
  }

  _onaddScholarshipButton(event) {
    event.preventDefault();
    //hide current body
    document.querySelector(".scholarshipInfo").classList.add("hidden");
    document.querySelector(".scholarshipInfoForm").classList.remove("hidden");
    //show body of other HTML elements
  }

  /* FUNCTIONALITY FOR ADD SCHOLARSHIP*/
  _onClear(event) {
    event.preventDefault();
    //this specific function was told to me in the style comments 2.1 assignment by Michael Cao ༼ つ ◕_◕ ༽つ
    this._addForm.reset();
  }

  //adds scholarship to the database
  async _onSubmit(event) {
    event.preventDefault();
    let scholarshipData = {
      scholarshipName: this._addForm.scholarshipName.value,
      organizationName: this._addForm.organizationName.value,
      dei: this._addForm.dei.value,
      quantity: this._addForm.quantity.value,
      open: this._addForm.open.value,
      due: this._addForm.due.value,
      grade: this._addForm.grade.value,
      scholarshipLink: this._addForm.scholarshipLink.value
    };
    await Scholarship.createScholarship(scholarshipData);
    this._addForm.reset();
  }

  /* Load (or reload) a scholarship Takes the value of the current scholarship */
  async _loadNextScholarship(id) {
    try {
      this._scholarship = await Scholarship.getScholarship(id);
      document.querySelector("#scholarshipName").textContent = this._scholarship.scholarshipName;
      document.querySelector("#organizationName").textContent = this._scholarship.organizationName;
      document.querySelector("#dei").textContent = this._scholarship.dei;
      document.querySelector("#quantity").textContent = this._scholarship.quantity;
      document.querySelector("#open").textContent = this._scholarship.open;
      document.querySelector("#due").textContent = this._scholarship.due;
      document.querySelector("#grade").textContent = this._scholarship.grade;
      document.querySelector("#scholarshipLink").textContent = this._scholarship.scholarshipLink;
    } catch (error) {
      alert("There are no more available scholarships in our Database, check back later 💜"); //userView
    }
  }
}


